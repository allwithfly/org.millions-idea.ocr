CREATE TABLE `wallet` (
  `wid` int(11) NOT NULL AUTO_INCREMENT COMMENT '钱包主键',
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `balance` int(11) NOT NULL COMMENT '钱包余额',
  `version` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`wid`),
  UNIQUE KEY `uq_uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='钱包表';


INSERT INTO `wallet`(uid,balance) VALUES(1, 100);

INSERT INTO `wallet`(uid,balance) VALUES(2, 100);


#扣减余额
UPDATE wallet SET balance = balance - (SELECT reduce FROM backcategorys WHERE `code` = 'T0003604'), version = version + 1
WHERE uid = 1 AND balance > 0 AND version = 1;
