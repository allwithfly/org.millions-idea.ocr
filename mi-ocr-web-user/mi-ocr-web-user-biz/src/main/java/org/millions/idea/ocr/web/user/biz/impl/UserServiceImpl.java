/***
 * @pName mi-ocr-web-user
 * @name UserServiceImpl
 * @user HongWei
 * @date 2018/6/22
 * @desc
 */
package org.millions.idea.ocr.web.user.biz.impl;

import org.millions.idea.ocr.web.common.entity.exception.MessageException;
import org.millions.idea.ocr.web.common.utility.encrypt.Md5Util;
import org.millions.idea.ocr.web.common.utility.json.JsonUtil;
import org.millions.idea.ocr.web.user.biz.IUserService;
import org.millions.idea.ocr.web.user.entity.common.LoginResult;
import org.millions.idea.ocr.web.user.entity.db.Users;
import org.millions.idea.ocr.web.user.repository.mapper.IUserMapperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements IUserService {
    private final IUserMapperRepository userMapperRepository;
    private final RedisTemplate redisTemplate;
    @Autowired
    public UserServiceImpl(IUserMapperRepository userMapperRepository, RedisTemplate redisTemplate) {
        this.userMapperRepository = userMapperRepository;
        this.redisTemplate = redisTemplate;
    }


    /**
     * Get user information by uid
     *
     * @param uid
     * @return
     */
    @Override
    public Users getUser(Integer uid) {
        return userMapperRepository.query(uid);
    }

    /**
     * Login
     *
     * @param uname
     * @param pwd
     * @return
     */
    @Override
    public LoginResult login(String uname, String pwd) {
        /*
            登录流程：
                1、获取加密后的密码
                2、查询数据库
                3、存入缓存服务器并返回key
         */
        String newPwd = Md5Util.getMd5(uname + pwd);
        Users user = userMapperRepository.login(uname, newPwd);
        if(user == null) throw new MessageException("用户名或密码错误");

        String key = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(key, JsonUtil.getJson(user), 30, TimeUnit.MINUTES);
        return new LoginResult(user, key);
    }


}
