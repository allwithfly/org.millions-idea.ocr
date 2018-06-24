﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mi_ocr_worker_win_app_biz.Impl;
using mi_ocr_worker_win_app_biz.Util;
using mi_ocr_worker_win_app_entity;
using mi_ocr_worker_win_app_entity.common;
using mi_ocr_worker_win_app_utility;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace mi_ocr_worker_win_app_biz
{
    public class ReceiveMessageServiceImpl : IReceiveMessageService
    {
        private IWalletService walletService { get; set; }

        public void OnMessage(EventingBasicConsumer consumer, string message, Action<bool> call)
        { 
            Captcha captcha = JsonConvert.DeserializeObject<Captcha>(message);
            // Checking rule
            if (captcha == null || captcha.Binary == null || !ChannelUtil.IsDefined(captcha.Channel)) {
                call(false);
                return;
            }

            // Resolve direction
            MessageSourceManager.Instance.NotifyAllDiscern(captcha, (code)=> {
                if (code == null) {
                    call(false);
                    return;
                }


                call(true);

                // Reduce balance 
                var msg = JsonConvert.SerializeObject(new WalletReq()
                {
                    token = captcha.Token,
                    channel = captcha.Channel
                });
                var body = Encoding.UTF8.GetBytes(msg);
                consumer.Model.BasicPublish(MultiQueue.Exchange, MultiQueue.Wallet, null, body);
                Console.WriteLine($"发送扣费请求:{msg}");
            });
        }
         

    }
}
