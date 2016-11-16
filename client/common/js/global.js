/***
 * 全局变量定义
 */
const Global = {
    /***
     * TODO
     *  角色 0个人 3企业 -1表示未知
     */
    ROLE: {
        PERSON: 0,
        ENTERPRISE: 3,
        BORROWER: -1,
    },
    /**
     * 区域数据
     */
    REGION:{
        PROVINCE: [],
        CITY: [],
        COUNTY: []
    },
    /***
     * 最大充值限额
     */
    MAX_LIMIT_RECHARGE: 1000000,
    /***
     * 企业名称
     */
    COMPANY: '中科柏诚',
    /***
     * 客服电话
     */
    SERVICE_TEL: '4006-111-566',
    /***
     * 提现手续费
     */
    CASH_FEE: 2,
    /***
     *
     * 组件入口  所有组件都挂载在这个命名空间下
     */
    component: {},
    /**
     * 所有页面地址
     */
    LINK: {
        /**
         * 用户相关
         */
        USER: {
            LOGIN: '../user/login.html',
            REGISTER: '../user/register.html',
            FIND_PASSWORD: '../user/pwd-find.html',
            RESET_PASSWORD: '../user/pwd-reset.html',
            GO_REGISTER: '/dev/client/views/user/register.html',
        },
        /**
         * 首页
         */
        INDEX: '../index/index.html',
        /**
         * 投资列表
         */
        INVEST_LIST: '../list/invest-list.html',
        /**
         * 转让列表
         */
        DEBT_LIST: '../list/debt-list.html',
        /**
         * 债权认购地址
         */
        BUY_DEBT: '/loan/rights/buy?loanInvestorId=',
        /**
         * 借款相关页面
         */
        LOAN: {
            /**
             * 个人借款
             */
            PERSON_LOAN: '../borrow/person-loan.html',
            /**
             * 企业借款
             */
            ENTERPRISE_LOAN: '../borrow/enterprise-loan.html',
            /**
             * 个人申请借款页
             */
            PERSON_LOAN_APPLY: './person-loan-apply.html?',
            /**
             * 企业申请借款页
             */
            ENTERPRISE_LOAN_APPLY: './enterprise-loan-apply.html?',
            /**
             * 企业申请借款成功页
             */
            ENTERPRISE_APPLY_SUCCESS: './enterprise-apply-success.html',
            /**
             * 个人申请借款成功页
             */
            PERSON_APPLY_SUCCESS: './person-apply-success.html',
        },
        /**
         * 个人标详情
         */
        PERSON_INVEST_DETAIL: '../invest-detail/person-detail.html',
        /**
         * 企业标详情
         */
        ENTERPRISE_INVEST_DETAIL: '../invest-detail/enterprise-detail.html',
        /**
         * 新手指引
         */
        GUIDE: '../other/guide.html',
        /**
         * 账户中心
         */
        ACCOUNT: {
            ACCOUNT: '../account/account.html',
            ACCOUNT_SETTING: '../account/account-setting.html',
            BORROW_RECORD: '../account/borrow-record.html',
            COLLECTION: '../account/collection.html',
            COLLECTION_PLANNING: '../account/collection-planning.html?',
            DEBT_INDEX: '../account/debt-index.html',
            HOBBY: '../account/hobby.html',
            HOBBY_ADD: '../account/hobby-add.html',
            HOBBY_EDIT: '../account/hobby-edit.html?',
            INVEST_RECORD: '../account/invest-record.html',
            INVITE_FRIENDS: '../account/invite-friends.html',
            MESSAGE_CENTER: '../account/message-center.html',
            MESSAGE_DETAIL: '../account/message-detail.html?',
            PERSON_INFO: '../account/person-info.html',
            RECHARGE: '../account/recharge.html',
            RED_MONEY: '../account/red-money.html',
            REPAYMENT_PLAN: '../account/repayment-plan.html?',
            SCORE: '../account/score.html',
            SCORE_EXCHANGE: '../account/score-exchange.html',
            SESSION: '../account/session.html'
        },
        /**
         * 关于我们
         */
        ABOUT_US: {
            DETAIL: '../about-us/detail.html',
            CONTENT: '../about-us/content.html',
            LIST: '../about-us/list.html'
        },
        /**
         * 其他页面
         */
        OTHER: {
            INSURANCE: '../other/insurance.html',
            HELP: '../other/help.html',
            ACTIVITY: '../other/activity.html',
            GUIDE: '../other/guide.html',
            CALCULATE: '../other/calculate.html',
        }
    },
    /**
     * 页面所有的异步请求
     */
    URLS: {
        /**
         * 用户相关
         */
        USER: {
            LOGIN: {
                /**
                 * 登录
                 */
                LOGIN: '/login'
            },
            REGISTER: {
                /**
                 * 验证用户名是否存在
                 */
                NICKNAME_EXISTED: '/common/nickNameExisted',
                /**
                 * 获取手机注册时的图片验证码
                 */
                SEND_IMG_JCAPTCHA_IN_PHONE: '/jcaptcha/registerByPhone',
                /**
                 * 验证手机注册时的图片验证码是否正确
                 */
                CHECK_IMG_JCAPTCHA_IN_PHONE: '/register/checkImgJCaptchaInPhone',
                /**
                 * 发送短信
                 */
                SEND_PHONE_CODE: '/register/sendPhoneCode',
                /**
                 * 验证短信是否正确
                 */
                CHECK_CODE_BY_PHONE: '/register/checkCodeByPhone',
                /**
                 * 通过手机注册
                 */
                REGISTER_BY_PHONE: '/register/registerByPhone',
                /**
                 * 发送邮箱验证码
                 */
                SEND_EMAIL_CODE: '/register/sendEmailCode',
                /**
                 * 验证邮箱验证码是否正确
                 */
                CHECK_CODE_BY_MAIL: '/register/checkCodeByMail',
                /**
                 * 通过邮箱注册
                 */
                REGISTER_BY_EMAIL: '/register/registerByEmail'
            },
            FIND_PASSWORD: {
                /**
                 * 找回密码-验证手机是否存在
                 */
                PHONE_EXISTED: '/findPassword/phoneExisted',
                /**
                 * 找回密码-验证图片验证码（手机）
                 */
                CHECK_IMG_JCAPTCHA_IN_PHONE: '/findPassword/checkImgJCaptchaInPhone',
                /**
                 * 找回密码-发送短信
                 */
                SEND_PHONE_CODE: '/findPassword/sendPhoneCode',
                /**
                 * 找回密码-发送图片验证码（手机）
                 */
                FIND_PWD_BY_PHONE: '/jcaptcha/findPwdByPhone',
                /**
                 * 找回密码-验证短信
                 */
                CHECK_CODE_BY_PHONE: '/findPassword/checkCodeByPhone',
                /**
                 * 找回密码-邮箱是否存在
                 */
                EMAIL_EXISTED: '/findPassword/emailExisted',
                /**
                 * 找回密码-验证图片验证码（邮箱）
                 */
                CHECK_IMG_JCAPTCHA_IN_EMAIL: '/findPassword/checkImgJCaptchaInEmail',
                /**
                 * 找回密码-发送邮箱验证码
                 */
                SEND_EMAIL_CODE: '/findPassword/sendEmailCode',
                /**
                 * 找回密码-发送图片验证码（邮箱）
                 */
                FIND_PWD_BY_EMAIL: '/jcaptcha/findPwdByEmail',
                /**
                 * 找回密码-验证邮箱验证码
                 */
                CHECK_CODE_BY_MAIL: '/findPassword/checkCodeByMail',
                /**
                 * 找回密码-重置密码
                 */
                RESET_PASSWORD: '/findPassword/resetPassword'
            }
        },
        /**
         * 首页
         */
        INDEX: '/index',
        /**
         * 关于我们
         */
        ABOUT_US: {
            LIST: '/common/aboutList',
            DETAIL: '/common/aboutDetail',
            CONTENT: '/common/aboutContent'
        },
        /**
         * 其他页面
         */
        OTHER: {
            INSURANCE: '/common/insurance',
            HELP: '/common/help',
            ACTIVITY: '/common/activity'
        },
        /**
         * 某些页面只需要User信息
         */
        GET_USER: '/common/getUser',
        /**
         * 公共URL
         */
        COMMON: {
            /**
             * 通过第三方检查用户是否开通第三方
             */
            PAY_ACCOUNT_READY: '/payAccountReady',
            EMAIL_EXISTED: '/common/emailExisted',
            PHONE_EXISTED: '/common/phoneExisted',
            /**
             * 登出
             */
            LOGOUT: '/logout',
        },
        /**
         * 投资列表页面
         */
        INVEST_LIST: '/investList',
        /**
         * 转让列表页面
         */
        DEBT_LIST: '/debtList',
        /**
         * 转让列表页面
         */
        DEBT_AGREEMENT: '/debtAgreement',
        /**
         * 标详情
         */
        DETAIL: {
            /**
             * 标的收藏
             */
            ADD_CLOSELY: '/detail/addClosely',
            /**
             * 个人标详情
             */
            PERSON_DETAIL: '/detail/personDetail',
            /**
             * 企业标详情
             */
            ENTERPRISE_DETAIL: '/detail/personDetail',
            /**
             * 标详情的投资记录
             */
            INVEST_DETAIL_LIST: '/detail/investDetailList',
            /**
             * 标详情的投资图片验证码
             */
            INVEST_VERFIY_CODE: '/jcaptcha/investVerfiyCode',
            /**
             * 标详情的投资图片验证码
             */
            CHECK_INVEST_VERFIY_CODE: '/detail/checkInvestVerfiyCode',
            /**
             * 投资跳转第三方地址
             */
            BUY_LOAN: '/loan/bid?loanId='
        },
        /**
         * 借款相关请求
         */
        LOAN: {
            PERSON_LOAN: '/borrow/person',
            ENTERPRISE_LOAN: '/borrow/enterprise',
            CHECK_EMAIL_PHONE: '/borrow/checkEmailOrPhone',
            CHECK_FULL_INFO: '/borrow/checkFullInfo',
            CHECK_IS_BLACK_NAME: '/borrow/isBlackName',
            PERSON_APPLY: '/borrow/personApply',
            PERSON_APPLY_SAVE: '/borrow/personApplySave',
            ENTERPRISE_APPLY: '/borrow/enterpriseApply',
            ENTERPRISE_APPLY_SAVE: '/borrow/enterpriseApplySave',
            APPLY_BORROW_JCAPTCHA: '/jcaptcha/applyBorrowJCaptcha',
            CHECK_CAPTCHA: '/borrow/checkCaptcha'
        },
        /**
         * 账户中心相关请求
         */
        ACCOUNT: {
            ACCOUNT_CENTER: {
                GET_INFO: '/account/info',
                GET_ACCOUNT_INFO: '/account/queryUserInfo',
                GET_WAIT_LIST: '/account/getWaitList',
                VERIFY: '/account/verify',
                GET_VIP: '/account/getVIP',
                DEAL_LOAN: '/account/dealLoan',
            },
            RECHARGE: {
                RECHARGE: '/account/balance/recharge',
                CASH: '/account/balance/cash',
                RECHARGE_INFO: '/account/rechargeCashInfo'
            },
            SESSION: '/account/session',
            DEBT: {
                TRANSFER_IN_DEBT: '/account/transferInDebt',
                TRANSFER_ABLE_DEBT: '/account/transferableDebt',
                TRANSFERRED_DEBT: '/account/transferredDebt',
                SUBSCRIBED_DEBT: '/account/subscribedDebt',
                UN_SELL_DEBT: '/account/unSellDebt',
                DEBT_PARAM: '/account/debtParam',
                COMPUTING_FEE: '/account/computingFee',
                SELL_DEBT: '/account/sellDebt'
            },
            BORROW: {
                REPAYMENT_IN: '/account/repaymentIn',
                FUNDRAISING: '/account/fundraising',
                AUDIT: '/account/audit',
                ALREADY_REPAID: '/account/alreadyRepaid',
                REPAY: '/account/repay',
                REPAYMENT_PLAN: '/account/repaymentPlan'
            },
            COLLECTION: '/account/collection',
            INVEST: {
                BACK_IN: '/account/invest/backIn',
                FUNDRAISING: '/account/invest/fundraising',
                COMPLETED: '/account/invest/completed',
                INVEST_PDF: '/account/invest/investPdf',
                COLLECTION_PLANNING: '/account/invest/collectionPlanning'
            },
            SCORE: {
                SCORE: '/account/score',
                GET_GOODS_SCORE: '/account/getGoodsByScore',
                SCORE_EXCHANGE: '/account/scoreExchange'
            },
            RED_MONEY: '/account/redMoney',
            INVITE_FRIENDS: {
                GET_FRIENDS_LIST: '/account/inviteFriends',
                COPY_LINK: '/account/copyLink'
            },
            HOBBY: {
                GET_HOBBY_LIST: '/account/hobby',
                DELETE_HOBBY: '/account/deleteHobby',
                ADD_HOBBY: '/account/addHobby',
                GET_CREDIT_GRADE_LIST: '/account/getCreditGradeList',
                EDIT_HOBBY: '/account/editHobby',
                GET_HOBBY_BY_ID: '/account/getHobbyById'
            },
            MESSAGE_CENTER: {
                GET_MESSAGE_CENTER_LIST: '/account/messageCenter',
                MARKED_READ: '/account/markedRead',
                MARKED_NO_READ: '/account/markedNoRead',
                DEL_INNER_MAIL: '/account/delInnerMail',
                SAVE_MSG_SETUP: '/account/saveMessageSetup',
                MESSAGE_DETAIL: '/account/messageDetail?'
            },
            ACCOUNT_SETTING: {
                ACCOUNT_SETTING: '/account/accountSetting',
                CHECK_CODE_BY_PHONE: '/account/checkCodeByPhone',
                BIND_PHONE: '/account/boundPhone',
                GET_PHONE_CODE: '/account/getPhoneCode',
                CHECK_CODE_BY_MAIL: '/account/checkCodeByMail',
                BIND_EMAIL: '/account/bindEmail',
                GET_EMAIL_CODE: '/account/getEmailCode',
                IS_OLD_PWD_RIGHT: '/account/isOldPasswordRight',
                IS_IMG_CODE_RIGHT: '/account/isSettingImgCodeRight',
                UPDATE_PASSWORD: '/account/updatePassword',
                GET_IMG_CODE: '/jcaptcha/updatePassword',
                BIND_BANKCARD: '/account/card/bind',
                PERSON_PAY_PWD: '/account/create',
                ENTERPRISE_PAY_PWD: '/account/create1'
            },
            PERSON_INFO: {
                GET_PERSONAL_INFO: '/account/getPersonalInfo',
                GET_WORD_INFO: '/account/getWorkInfo',
                GET_FINANCIAL_INFO: '/account/getFinancialInfo',
                GET_CONTACT_INFO: '/account/getContactInfo',
                GET_LOAN_CREDIT_MATERIAL: '/account/getLoanCreditMaterial',
                SAVE_PERSONAL_INFO: '/account/savePersonalInfo',
                SAVE_WORD_INFO: '/account/saveWorkInfo',
                SAVE_FINANCIAL_INFO: '/account/saveFinancialInfo',
                SAVE_CONTACT_INFO: '/account/saveContact',
                CREDIT_MATERIAL: '/account/creditMaterial',
                SHOW_PIC: '/account/showPic',
                DELETE_CREDIT_MATERIAL: '/account/deleteCreditMaterial'
            }
        }
    }
};
module.exports = Global;
