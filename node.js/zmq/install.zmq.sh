#!/bin/sh
sudo apt-get install libtool autoconf automake uuid-dev build-essential
cd ~
wget http://download.zeromq.org/zeromq-3.2.2.tar.gz
tar zxvf zeromq-3.2.2.tar.gz && cd zeromq-3.2.2
./configure
sudo make && sudo make install
#dont 4get export LD_LIBRARY_PATH=/usr/local/lib:${LD_LIBRARY_PATH} #add it to the .bashrc