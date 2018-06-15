package org.millions.idea.ocr.worker.app.service;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;

public interface IMessageListenerService extends ChannelAwareMessageListener {
    void onMessage(Message message, Channel channel) throws Exception;
}
