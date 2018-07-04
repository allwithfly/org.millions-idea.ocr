/***
 * @pName mi-ocr-web-user
 * @name UserEntity
 * @user HongWei
 * @date 2018/6/25
 * @desc
 */
package org.millions.idea.ocr.web.user.entity.ext;

import org.millions.idea.ocr.web.user.entity.agent.WalletEntity;
import org.millions.idea.ocr.web.user.entity.db.Users;

import java.sql.Timestamp;

public class UserEntity extends Users {
    private String token;
    private WalletEntity wallet;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public WalletEntity getWallet() {
        return wallet;
    }

    public void setWallet(WalletEntity wallet) {
        this.wallet = wallet;
    }

    public UserEntity() {

    }

    public UserEntity(Integer uid, String userName, String password, Integer issueId, String issueResult, String contact, Timestamp registTime, Timestamp lastActiveTime, String lastLoginIp, String token, WalletEntity wallet) {
        super(uid, userName, password, issueId, issueResult, contact, registTime, lastActiveTime, lastLoginIp);
        this.token = token;
        this.wallet = wallet;
    }

    public UserEntity(String token, WalletEntity wallet) {
        this.token = token;
        this.wallet = wallet;
    }
}
