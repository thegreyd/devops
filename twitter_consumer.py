from kafka import KafkaConsumer

consumer = KafkaConsumer('twitterstream', bootstrap_servers='localhost:9092')

count = 0
max_count = 10
offset = 57

for msg in consumer:
	value = msg.value.lower()
	# if 'devops' in value or 'dev ops' in value or 'from' in value:
	# if 'devops' in value or 'dev ops' in value:
	if 'thanksgiving' in value or 'holiday' in value:

		f = open("bootstrap/index.html", 'r')
		data = f.readlines()
		f.close()

		data[offset + count] = "<p class=\"lead\"> " + str(msg.offset) + " : " + str(msg.value.replace('\n',' ')) + " </p> \n"
		with open("bootstrap/index.html", 'w') as f:
			f.writelines(data)

		count = (count + 1) % max_count

		print msg.offset, msg.value

# for msg in consumer:
# 	print msg