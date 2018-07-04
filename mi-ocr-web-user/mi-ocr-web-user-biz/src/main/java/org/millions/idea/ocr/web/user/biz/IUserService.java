/***
 * @pName mi-ocr-web-user
 * @name IUserService
 * @user HongWei
 * @date 2018/6/22
 * @desc
 */
package org.millions.idea.ocr.web.user.biz;

import org.millions.idea.ocr.web.common.entity.common.HttpResp;
import org.millions.idea.ocr.web.user.entity.common.LoginResult;
import org.millions.idea.ocr.web.user.entity.db.Users;

import java.math.BigDecimal;
import java.util.List;

public interface IUserService {

    /**
     * Get user information by uid
     * @param uid
     * @return
     */
    Users getUser(Integer uid);

    /**
     * Login
     * @param uname
     * @param pwd
     * @return
     */
    String login(String uname, String pwd);


    /**
     * 查询余额
     * @param token
     * @return
     */
    BigDecimal getBalance(String token);
}
