cmake_minimum_required(VERSION 3.1)

project(Arrangement2D)

set(CMAKE_VERBOSE_MAKEFILE off)
set(CMAKE_BUILD_TYPE Release)

# Check EMSDK if set in the path
if (NOT DEFINED ENV{EMSDK})
    message(FATAL_ERROR "EMSDK is not set in the path, exiting.")
    return()
endif()

find_package(Python3)
# Setup some paths
set(PYTHON ${Python3_EXECUTABLE})
set(EMSCRIPTEN_ROOT $ENV{EMSDK}/upstream/emscripten)
set(WEBIDL_BINDER ${EMSCRIPTEN_ROOT}/tools/webidl_binder.py)
set(WEBIDL_INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/src/arrangement2d.idl)
set(WEBIDL_HEADER ${CMAKE_CURRENT_SOURCE_DIR}/src/arrangement2d.h)
set(MODULE_NAME Arrangement2D)
set(TS_DEF_MOD_FILE ${MODULE_NAME}.esm.d.ts)
set(TS_DEF_UMD_FILE ${MODULE_NAME}.umd.d.ts)

# Include cgal and boost headers
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/libraries/CGAL-5.4/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/libraries/boost_1_79_0)
set(CGAL_INCLUDE ${CMAKE_CURRENT_SOURCE_DIR}/libraries/CGAL-5.4/include)
set(BOOST_INCLUDE ${CMAKE_CURRENT_SOURCE_DIR}/libraries/boost_1_79_0)

# Get the source files
file(GLOB_RECURSE CPP_FILES src/*.cpp)
file(GLOB_RECURSE C_FILES src/*.c)



# This target uses emscripten embedded python3 to run the webidl_binder in the
# EMSDK path to generates glue.cpp and glue.js from interface.idl
add_custom_command(
    OUTPUT glue.cpp glue.js
    COMMAND ${PYTHON} ${WEBIDL_BINDER} ${WEBIDL_INTERFACE} glue
    DEPENDS ${WEBIDL_INTERFACE}
    COMMENT "Generating glue files"
    VERBATIM
)

add_custom_command(
    OUTPUT wrapper.cpp
    COMMAND echo "\\n#include \"${WEBIDL_HEADER}\"" > wrapper.cpp
    COMMAND echo "\\n#include \"glue.cpp\"" >> wrapper.cpp
    DEPENDS glue.cpp
    COMMENT "Generating wrapper"
    VERBATIM
)

# Target that builds the typescript definitions file based on the webidl
# interface
add_custom_command(
    OUTPUT ${TS_DEF_MOD_FILE} ${TS_DEF_UMD_FILE}
    COMMAND npx webidl2ts -i ${WEBIDL_INTERFACE} -o ${TS_DEF_MOD_FILE} -ed -n ${MODULE_NAME}
    COMMAND npx webidl2ts -i ${WEBIDL_INTERFACE} -o ${TS_DEF_UMD_FILE} -ed -n ${MODULE_NAME}
    COMMENT "Generating Typescript definitions"
    DEPENDS ${WEBIDL_INTERFACE}
    VERBATIM
)

# As we are using the same sources files for multiple targets, we build a
# temporary object library that will be included in the final emcc command
add_library(common-objects OBJECT ${CPP_FILES} ${C_FILES} wrapper.cpp)

# Emscripten compilation and linking options
add_executable(esm $<TARGET_OBJECTS:common-objects> ${TS_DEF_MOD_FILE})
set_target_properties(esm
    PROPERTIES
    ADDITIONAL_CLEAN_FILES "wrapper.cpp;glue.cpp;glue.js;${MODULE_NAME}.wasm"
    OUTPUT_NAME ${MODULE_NAME}.esm
    SUFFIX ".js"
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
    CFLAGS "-O3"
    LINK_FLAGS "\
      -s WASM=1 \
      -s EXPORT_ES6=1 \
      -s MODULARIZE=1 \
      -s SINGLE_FILE=1 \
      -s USE_ES6_IMPORT_META=1 \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s ASSERTIONS \
      -s NO_EXIT_RUNTIME=1 \
      -s NO_FILESYSTEM=1 \
      -s EXPORT_NAME=${MODULE_NAME} \
      -s DEMANGLE_SUPPORT=1 \
      --post-js ${CMAKE_BINARY_DIR}/glue.js \
    "
)

add_executable(umd $<TARGET_OBJECTS:common-objects> ${TS_DEF_UMD_FILE})
set_target_properties(umd
    PROPERTIES
    ADDITIONAL_CLEAN_FILES "wrapper.cpp;glue.cpp;glue.js;${MODULE_NAME}.wasm"
    OUTPUT_NAME ${MODULE_NAME}.umd
    SUFFIX ".js"
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
    CFLAGS "-O3"
    LINK_FLAGS "\
      -s WASM=1 \
      -s MODULARIZE=1 \
      -s SINGLE_FILE=1 \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s ASSERTIONS \
      -s NO_EXIT_RUNTIME=1 \
      -s NO_FILESYSTEM=1 \
      -s EXPORT_NAME=${MODULE_NAME} \
      -s DEMANGLE_SUPPORT=1 \
      --post-js ${CMAKE_BINARY_DIR}/glue.js \
    "
)
