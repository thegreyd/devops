# csc_519_devops
Repo for CSC 519 - DevOps

### [Screencast](https://youtu.be/mKFDtyoc910)

#### Install python libraries 
sudo pip install -r requirements.txt

#### Install zookeeper 
brew install zookeeper 

#### Install kafka 
brew install kafka

#### Start Zookeeper (Default port - 2181)
bin/zkServer start

#### Start Kafka (Default port - 9092)
bin/kafka-server-start /usr/local/etc/kafka/server.properties

#### Create kafka topic
bin/kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic twitterstream

#### List all kafka topics 
bin/kafka-topics --list --zookeeper localhost:2181

#### Stream from twitter, and save on Kafka 
python twitter_to_kafka.py

#### Check if messages are stored in Kafka 
bin/kafka-console-consumer --zookeeper localhost:2181 --topic twitterstream --from-beginning

#### Run twitter consumer script
python twitter_consumer.py
