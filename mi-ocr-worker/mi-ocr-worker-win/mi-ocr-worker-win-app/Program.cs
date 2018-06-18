﻿using mi_ocr_worker_win_app.Config;
using mi_ocr_worker_win_app_biz;
using mi_ocr_worker_win_app_entity;
using Microsoft.Practices.Unity;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace mi_ocr_worker_win_app
{

    class Program
    {
        public static IReceiveMessageService ReceiveMessageService { get; set; }

        static void Main(string[] args)
        {
            UnityConfig.Configure();
            ReceiveMessageService = UnityConfig.Container.Resolve<ReceiveMessageServiceImpl>();
            QueueConfig.StartupMessageReceive(ReceiveMessageService.OnMessage);
            Console.WriteLine($"Startup state is {Caffe.InitCaptcha("./deploy.prototxt", ConfigurationManager.AppSettings["caffemodel"], "./label-map.txt", -1, 32)}");
            Console.WriteLine("Please enter \"exit\" to exit the system safely.");
            var cmdLine = string.Empty;
            do
            {
                cmdLine = Console.ReadLine();
            } while (cmdLine != "exit");
            QueueConfig.Close();
        }
    }
}
