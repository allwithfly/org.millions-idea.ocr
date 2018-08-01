/***
 * @pName mi-ocr-web-order
 * @name Wallet
 * @user HongWei
 * @date 2018/7/1
 * @desc
 */
package org.millions.idea.ocr.web.order.entity.db;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Wallet {
    private Integer autoId;
    private Integer uid;
    private BigDecimal balance;
    private Timestamp editDate;
    private Integer state;
    private Integer version;

    public Integer getAutoId() {
        return autoId;
    }

    public void setAutoId(Integer autoId) {
        this.autoId = autoId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Timestamp getEditDate() {
        return editDate;
    }

    public void setEditDate(Timestamp editDate) {
        this.editDate = editDate;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Wallet() {

    }

    public Wallet(Integer autoId, Integer uid, BigDecimal balance, Timestamp editDate, Integer state, Integer version) {

        this.autoId = autoId;
        this.uid = uid;
        this.balance = balance;
        this.editDate = editDate;
        this.state = state;
        this.version = version;
    }
}
