
# Create lib folder
mkdir -p libraries/downloads



##################################### CGAL #####################################

CGAL_VERSION=5.4
CGAL_NAME=CGAL-5.4.tar.xz
CGAL_URL=https://github.com/CGAL/cgal/releases/download/v$CGAL_VERSION/$CGAL_NAME

echo "Downloading "$CGAL_NAME
wget -nc -q --show-progress -O libraries/downloads/$CGAL_NAME $CGAL_URL
echo "Extracting"
pv libraries/downloads/$CGAL_NAME | tar -xz -C libraries
echo "Done"


##################################### CGAL #####################################

BOOST_VERSION=1.79.0
BOOST_NAME=boost_1_79_0.tar.gz
BOOST_URL=https://boostorg.jfrog.io/artifactory/main/release/$BOOST_VERSION/source/$BOOST_NAME

echo "Downloading "$BOOST_NAME
wget -nc -q --show-progress -O libraries/downloads/$BOOST_NAME $BOOST_URL
echo "Extracting"
pv libraries/downloads/$BOOST_NAME | tar -xz -C libraries
echo "Done"










