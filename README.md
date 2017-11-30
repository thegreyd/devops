# csc_519_devops
Repo for CSC 519 - DevOps

### [Screencast](https://youtu.be/mKFDtyoc910)

## Installation Steps

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


## Report 
We followed the following work division for the tech talk. 

- Demo - Zubin Thampi, Meghav Desai 
- Presentation (Kafka Details, Pros and Cons, Alternatives, Design Aspects etc) - Kshitija Murudi, Shishir Nagendra, Siddharth Sharma 

Apache Kafka is a tool used for data streaming, and similar applications. 
It has gained immense importance in the industry recently, with organizations like LinkedIn using it for their data streaming requirements exclusively. 

There are two main types of application of Kafka - 
1. Applications that make use kafka as a message passing service
2. Applications that consume streams of data from Kafka and process them for interesting outputs

Following are a couple of example applications where Apache Kafka is used
1. Website Activity Tracking, usually in tandem with data analytics tools as well, as they need to streamline the massive amounts of input data coming in. 
2. As a Central Hub for syncronizing data between a input section and an output section
3. Logging - In an application, there might be logs recorded from several parts, which the database/file may not be able to process simultaneouly. Apache Kafka can be used as a buffer in this case. 
4. Metrics/Monitoring - Similar to point 3

A couple of properties of Kafka are
1. Kafka is run as a cluster on one or more servers.
2. The Kafka cluster stores streams of records in categories called topics.
3. Each record consists of a key, a value, and a timestamp.

The high-level components of Kafka can be classified into 
1. The Producer API allows an application to publish a stream of records to one or more Kafka topics.
2. The Consumer API allows an application to subscribe to one or more topics and process the stream of records produced to them.
3. The Streams API allows an application to act as a stream processor, consuming an input stream from one or more topics and producing an output stream to one or more output topics, effectively transforming the input streams to output streams.
4. The Connector API allows building and running reusable producers or consumers that connect Kafka topics to existing applications or data systems. For example, a connector to a relational database might capture every change to a table.

There are a couple of alternatives for Kafka for the use-cases that it serves 
1. Message Brokers -
    RabbitMQ - written in Erlang
    ActiveMQ - written in Java like Kafka
2. Stream Processing -
    Spark 
    Flink
    Storm
However, Kafka is often praised for its ability to performed one task only, and perform that very well! 
There is not another tool in the market which beats it in terms of performance for data streaming and buffering. 

There are several cloud services which offer Kafka as a service. They are often easier to integrate with your existing services (especially if they are also hosted on the cloud). They include 
1. AWS Kinesis / Kafka on AWS
2. Confluent Cloud
3. Heroku Kafka

Finally, following are the pros and cons we found with Apache Kafka 

Pros : 
1. Amazingly fast reads and writes
2. Does one thing and one thing only i.e. to transfer messages reliably
3. Does provide load balancing of consumers
4. No restrictions on transaction numbers, unlike Kinesis (There are restriction on Kafka if you use one of the cloud services)

Cons: 
1. Complicated to setup cluster compared to RabbitMQ
2. Dependency on Zookeeper, which is a configuration management) 
3. No Routing features (as compared to other tools)






