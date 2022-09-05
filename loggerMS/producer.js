const amqp = require("amqplib");
const config = require("./config");

/** 
 step-1 : connect with rabbitmq server
 step-2 : create a new channel on it
 step-3 : create exchange
 step-4 : Publish the message to exchange with routing key
*/

 class Producer {
   channel ;

  async createChannel() {
    // create connection && channel
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }
    // create exchange
    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };

    // publish the messsage to the exchange
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`The message : ${message} has been sent to the exchange ${exchangeName}`)
  }
}

module.exports = Producer;
