const root = {}

root.mode = 'history'
root.fallback = true
root.base = '/'

root.routes = []

root.routes.push({
  path: '',
  redirect: '/index',
  meta: {
    mobileHeaderTitle: ''
  },
  caseSensitive: true
})

// 404页面
root.routes.push({
  path: '*',
  redirect: '/index/home',
  meta: {
    mobileHeaderTitle: ''
  },
  caseSensitive: true,
  // component: resolve => require(['@/components/vue/IndexHome'], resolve)
})

// 好友邀请页面
root.routes.push({
  path: '/index/share',
  caseSensitive: true,
  name: 'FriendShare',
  meta: {
    mobileHeaderTitle: '',
    pcname: 'FriendShare',
    h5name: '',
  },
  component: resolve => require(['@/components/vue/IndexShare'], resolve)
})


// 20180607 H5BT活动首页     TODO：要删除
// root.routes.push({
//   path: '/static/mobileBTActivityHomePage',
//   name: 'MobileBTActivityHomePage',
//   caseSensitive: true,
//   meta: {
//     pcname: 'btActivity',
//     h5name: 'MobileBTActivityHomePage',
//   },
//   component: resolve => require(['@/components/btActivity/vue/MobileBTActivityHomePage.vue'], resolve),
// })

// 0714 netease 入口页
root.routes.push({
  path: '/static/registerForPartner',
  name: 'RegisterForPartner',
  caseSensitive: true,
  meta: {
    requireLogin: false,
    pcname: '',
    h5name: 'RegisterForPartner',
  },
  component: resolve => require(['@/components/mobileVue/MobileStaticForNetease.vue'], resolve),
})

root.routes.push({
  path: '/index/registerForPhone',
  name: 'RegisterForPhone',
  caseSensitive: true,
  meta: {
    requireLogin: false,
    requireLoginOff: true,
    pcname: '',
    h5name: 'RegisterForPhone',
  },
  component: resolve => require(['@/components/mobileVue/MobileRegisterForPhone.vue'], resolve),
})

root.routes.push({
  path: '/static/MobileStaticForNeteaseBind',
  name: 'MobileStaticForNeteaseBind',
  caseSensitive: true,
  meta: {
    requireLogin: false,
    pcname: '',
    h5name: 'MobileStaticForNeteaseBind',
  },
  component: resolve => require(['@/components/mobileVue/MobileStaticForNeteaseBind.vue'], resolve),
})

root.routes.push({
  path: '/static/MobileStaticNoJurisdiction',
  name: 'MobileStaticNoJurisdiction',
  caseSensitive: true,
  meta: {
    requireLogin: false,
    pcname: '',
    h5name: 'MobileStaticNoJurisdiction',
  },
  component: resolve => require(['@/components/mobileVue/MobileStaticNoJurisdiction.vue'], resolve),
})

root.routes.push({
  path: '/static/staticForPartnerInfo',
  name: 'MobileStaticForNeteaseInfo',
  caseSensitive: true,
  meta: {
    requireLogin: false,
    pcname: '',
    h5name: 'MobileStaticForNeteaseInfo',
  },
  component: resolve => require(['@/components/mobileVue/MobileStaticForNeteaseInfo.vue'], resolve),
})

// 0907 修改超级为蜜
// 20180607 H5BT活动首页
// root.routes.push({
//   path: '/static/mobileSuperBeeActivity',
//   name: 'MobileSuperBeeActivity',
//   caseSensitive: true,
//   meta: {
//     pcname: '',
//     h5name: 'MobileSuperBeeActivity',
//   },
//   component: resolve => require(['@/components/activity/vue/MobileSuperBeeActivity.vue'], resolve),
// })


// 上币公告 3_6 start
// root.routes.push({
//   path: '/index/currencyNotice',
//   name: 'ELFCurrencyNotice',
//   meta: {
//     requireLogin: false,
//     pcname: 'ELFCurrencyNotice',
//     h5name: '',
//   },
//   caseSensitive: true,
//   component: resolve => require(['@/components/vue/currencyNotice'], resolve)
// })

//     TODO：不能删除 check
// 上币公告 3_6 end
// 上币公告 3_9 start lost
root.routes.push({
  path: '/index/lostNotice',
  // redirect: '/index/tradingHall',   //关闭入口，重新指向交易大厅
  meta: {
    requireLogin: false,
  },
  caseSensitive: true,
  component: resolve => require(['@/components/activity/vue/noticeLost'], resolve)
})
// 上币公告 3_9 end lost

// 幸运抽奖 start 2018-9-10 TODO:要删除 check
root.routes.push({
  path: '/index/LuckyDraw',
  caseSensitive: true,
  meta: {
    requireLogin: false,
  },
  component: resolve => require(['@/components/LuckyDraw/vue/LuckyDrawForecast'], resolve),
  children: [
    { // 幸运抽奖
      path: 'Forecast',
      name: 'Forecast',
      caseSensitive: true,

      meta: {
        requireLogin: true,
        mobileHeaderTitle: '',
        pcname: 'Forecast',
        h5name: 'MobileForecastHomePage',
      },
      component: resolve => require(['@/components/LuckyDraw/vue/Forecast'], resolve),
      children: []
    },
    { // 我的记录
      path: 'Record',
      name: 'Record',
      caseSensitive: true,
      meta: {
        mobileHeaderTitle: '',
        pcname: 'Record',
        h5name: 'Record',
        requireLogin: true,
      },
      component: resolve => require(['@/components/LuckyDraw/vue/Record'], resolve),
      children: []
    },
  ]
})

// -------------------------------- mobile 部分 start ------------------------------------

// 幸运预测活动  TODO:要删除 check
root.routes.push({
  path: '/index/treasureBox',
  name: 'treasureBox',
  meta: {
    requireLogin: true,
    pcname: '',
    h5name: 'treasureBox',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/LuckyDraw/vue/treasureBox'], resolve)
})


// 合约首次进入弹框记录
root.routes.push({
  path: '/index/contractRiskWarning',
  name: 'contractRiskWarning',
  meta: {
    requireLogin: true,
    pcname: '',
    h5name: 'contractRiskWarning',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/vue/ContractRiskWarning'], resolve)
})


/*-----------------  跟单H5 begin  ------------------------*/
//H5  跟单首页
root.routes.push({
  path: '/index/mobileFollowTrade',
  name: 'mobileFollowTrade',
  meta: {
    requireLogin: true,
    pcname: 'followTrade',
    h5name: 'mobileFollowTrade',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/followTrade/vue/MobileFollowTrade'], resolve)
})
//H5  跟单策略个人
root.routes.push({
  path: '/index/mobileFollowTradeStrategy',
  name: 'mobileFollowTradeStrategy',
  meta: {
    requireLogin: true,
    pcname: 'followTradeStrategy',
    h5name: 'mobileFollowTradeStrategy',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/followTrade/vue/MobileFollowTradeStrategy'], resolve)
})
//H5  跟单策略大神
root.routes.push({
  path: '/index/mobileDocumentaryGod',
  name: 'mobileDocumentaryGod',
  meta: {
    requireLogin: true,
    pcname: 'documentaryGod',
    h5name: 'mobileDocumentaryGod',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/followTrade/vue/MobileDocumentaryGod'], resolve)
})
//H5  跟单
root.routes.push({
  path: '/index/mobileDocumentary',
  name: 'mobileDocumentary',
  meta: {
    requireLogin: true,
    pcname: 'documentary',
    h5name: 'mobileDocumentary',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/followTrade/vue/MobileDocumentary'], resolve)
})
//H5  带单管理
root.routes.push({
  path: '/index/mobileTapeListManage',
  name: 'mobileTapeListManage',
  meta: {
    requireLogin: true,
    pcname: 'tapeListManage',
    h5name: 'mobileTapeListManage',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/followTrade/vue/MobileTapeListManage'], resolve)
})
//H5  我的镜像交易
root.routes.push({
  path: '/index/mobileMyFollowOrder',
  name: 'mobileMyFollowOrder',
  meta: {
    requireLogin: true,
    pcname: 'myFollowOrder',
    h5name: 'mobileMyFollowOrder',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/followTrade/vue/MobileMyFollowOrder'], resolve)
})
/*-----------------  跟单H5 end  ------------------------*/
//H5  划转
root.routes.push({
  path: '/index/mobileWebTransferContract',
  name: 'mobileWebTransferContract',
  meta: {
    requireLogin: true,
    pcname: '',
    h5name: 'mobileWebTransferContract',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/vue/MobileWebTransferContract'], resolve)
})

/*-----------------  基金理财H5 begin  ------------------------*/
// 基金理财
root.routes.push({
  path: '/index/mobileFinancialFund',
  name: 'mobileFinancialFund',
  requireLogin: true,
  meta: {
    requireLogin: true,
    pcname: '',
    h5name: 'mobileFinancialFund',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/fundProducts/vue/MobileFinancialFund'], resolve),
  children:[
    {
      path: '',
      caseSensitive: true,
      redirect: 'mobileFundProducts',
      meta: {
        pcname: '',
        h5name: 'mobileFundProducts',
      },
    },
    // 基金产品页面
    {
      path: '/index/mobileFinancialFund/mobileFundProducts',
      name:'mobileFundProducts',
      caseSensitive: true,
      meta: {
        requireLogin: true,
        pcname: '',
        h5name: 'mobileFundProducts',
      },
      component: resolve => require(['@/components/fundProducts/vue/MobileFundProducts'], resolve),
    },

    // 基金资产页面
    {
      path: '/index/mobileFinancialFund/mobileFundAssets',
      name: 'mobileFundAssets',
      caseSensitive: true,
      meta: {
        requireLogin: true,
        pcname: '',
        h5name: 'mobileFundAssets',
      },
      component: resolve => require(['@/components/fundProducts/vue/MobileFundAssets'], resolve),
    },
  ]
})

// 基金理财详情
root.routes.push({
  path: '/index/mobileFundDetails',
  name: 'mobileFundDetails',
  requireLogin: true,
  meta: {
    requireLogin: false,
    pcname: '',
    h5name: 'mobileFundDetails',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/fundProducts/vue/MobileFundDetails'], resolve),
})

// 基金本期申购
root.routes.push({
  path: '/index/mobileFundCurrent',
  name: 'mobileFundCurrent',
  requireLogin: true,
  meta: {
    requireLogin: false,
    pcname: '',
    h5name: 'mobileFundCurrent',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/fundProducts/vue/MobileFundCurrent'], resolve),
})

//基金理财购买
root.routes.push({
  path: '/index/mobileFundBuy',
  name: 'mobileFundBuy',
  meta: {
    requireLogin: true,
    pcname: '',
    h5name: 'mobileFundBuy',
  },
  caseSensitive: true,
  component: resolve => require(['@/components/fundProducts/vue/MobileFundBuy'], resolve)
})
/*-----------------  基金理财H5 end  ------------------------*/

// 双平台通证合并公投 TODO:要删除 check
// root.routes.push({
//   path: '/index/mobileCombinedVotePage',
//   name: 'MobileCombinedVotePage',
//   meta: {
//     requireLogin: false,
//     pcname: 'CombinedVote',
//     h5name: 'MobileCombinedVotePage',
//   },
//   caseSensitive: true,
//   component: resolve => require(['@/components/combinedCoinVote/vue/MobileCombinedVotePage'], resolve),
// })


// -------------------------------- mobile 部分 end ------------------------------------

// 幸运抽奖 end 2018-9-10

// 活动页面
// root.routes.push({
//   path: '/index/activity',
//   caseSensitive: true,
//   meta: {
//     mobileHeaderTitle: ''
//   },
//   component: resolve => require(['@/components/vue/Activity'], resolve),
//   children: [
//     // {
//     //   path: '',
//     //   // redirect: 'homePage',
//     //   redirect: 'iccOpen',
//     //   caseSensitive: true,
//     //   meta: {
//     //     mobileHeaderTitle: '',
//     //     pcname: 'iccOpen',
//     //     h5name: '',
//     //   },
//     // },
//     //     TODO：要删除
//     // 开放icc
//     // {
//     //   path: 'iccOpen',
//     //   name: 'iccOpen',
//     //   caseSensitive: true,
//     //   meta: {
//     //     mobileHeaderTitle: '',
//     //     pcname: 'iccOpen',
//     //     h5name: '',
//     //   },
//     //   component: resolve => require(['@/components/activity/vue/IccOpen'], resolve),
//     // },
//     //     TODO：要删除
//     // 抽奖活动
//     // {
//     //   path: 'luckDraw',
//     //   name: 'luckDraw',
//     //   caseSensitive: true,
//     //   meta: {
//     //     mobileHeaderTitle: '',
//     //     pcname: 'luckDraw',
//     //     h5name: '',
//     //   },
//     //   component: resolve => require(['@/components/activity/vue/LuckDraw'], resolve),
//     // },
//     //     TODO：要删除，转盘
//     // EOS抽奖活动
//     // {
//     //   path: 'luckDrawEOS',
//     //   name: 'luckDrawEOS',
//     //   caseSensitive: true,
//     //   meta: {
//     //     mobileHeaderTitle: '',
//     //     pcname: 'luckDrawEOS',
//     //     h5name: '',
//     //   },
//     //   component: resolve => require(['@/components/activity/vue/LuckDrawEOS'], resolve),
//     // },
//     //     TODO：要删除
//     // 交易大厅蒙层
//     // {
//     //   path: 'FloatingLayerTradingHall',
//     //   name: 'FloatingLayerTradingHall',
//     //   caseSensitive: true,
//     //   redirect: 'FloatingLayerRecommend',
//     //   meta: {
//     //     requireLogin: false,
//     //     templateClose: false,
//     //     pcname: 'FloatingLayerTradingHall',
//     //     h5name: '',
//     //   },
//     //   component: resolve => require(['@/components/FloatingLayer/vue/FloatingLayerTradingHall'], resolve),
//     // },
//     //     TODO：要删除
//     // 我的推荐蒙层
//     // {
//     //   path: 'FloatingLayerRecommend',
//     //   name: 'FloatingLayerRecommend',
//     //   caseSensitive: true,
//     //   meta: {
//     //     requireLogin: false,
//     //     templateClose: false,
//     //     pcname: 'FloatingLayerRecommend',
//     //     h5name: '',
//     //   },
//     //   component: resolve => require(['@/components/FloatingLayer/vue/FloatingLayerRecommend'], resolve),
//     // },
//   ]
// })


// 币得宝 TODO:要删除 check
// root.routes.push({
//   path: '/coinbaby',
//   component: resolve => require(['@/components/CoinBaby/vue/CoinBaby'], resolve),
//   caseSensitive: true,
//   meta: {},
//   children: [
//     {
//       path: '',
//       redirect: 'biDeBaoList',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'biDeBaoList',
//         h5name: '',
//       }
//     },
//     // 币得宝活动列表
//     //TODO:要删除
//     {
//       path: 'biDeBaoList',
//       name: 'biDeBaoList',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         templatePath: '/index/home',
//         pcname: 'biDeBaoList',
//         h5name: '',
//       },
//       component: resolve => require(['@/components/bidebaoActivity/vue/BiDeBaoList'], resolve),
//     },
//     // 币得宝活动锁仓记录
//     //TODO:要删除
//     {
//       path: 'biDeBaoHistoricalRecords',
//       name: 'biDeBaoHistoricalRecords',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         templatePath: '/index/home',
//         pcname: 'biDeBaoHistoricalRecords',
//         h5name: 'biDeBaoHistoricalRecords',
//       },
//       component: resolve => require(['@/components/bidebaoActivity/vue/BiDeBaoRecordsPage'], resolve),
//     },
//     // H5币得宝 首页列表页
//     //TODO:要删除
//     {
//       path: 'H5BDBIndexList',
//       name: 'H5BDBIndexList',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         pcname: '',
//         h5name: 'H5BDBIndexList',
//       },
//       component: resolve => require(['@/components/bidebaoActivity/vue/H5BDBIndexList'], resolve),
//     },
//     // H5币得宝 锁仓详情页
//     //TODO:要删除
//     {
//       path: 'H5LockPositionDetail',
//       name: 'H5LockPositionDetail',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         pcname: '',
//         h5name: 'H5LockPositionDetail',
//       },
//       component: resolve => require(['@/components/bidebaoActivity/vue/H5LockPositionDetail'], resolve),
//     },
//     // 币得宝  2018-5-17 start
//     //TODO:要删除
//     {
//       path: 'lockPositionDetail',
//       name: 'lockPositionDetail',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         pcname: 'lockPositionDetail',
//         h5name: '',
//         // templatePath: '/index/tradingHallT'
//       },
//       component: resolve => require(['@/components/bidebaoActivity/vue/BidebaoDetail'], resolve),
//     },
//     // 币得宝  2018-5-17 end
//
//     // H5币得宝 立即抢购页
//     //TODO:要删除
//     {
//       path: 'H5BDBPurchaseDetail',
//       name: 'H5BDBPurchaseDetail',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         pcname: '',
//         h5name: 'H5BDBPurchaseDetail',
//       },
//       component: resolve => require(['@/components/bidebaoActivity/vue/H5BDBPurchaseDetail'], resolve),
//     },
//
//   ]
// });

// 静态页
//TODO:要删除

root.routes.push({
  path: '/static',
  component: resolve => require(['@/components/vue/StaticPage'], resolve),
  caseSensitive: true,
  meta: {},
  children: [
//     {
//       path: '',
//       redirect: 'RecommendActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'RecommendActivity',
//         h5name: '',
//       }
//     },
//     // 推荐返佣
//     //TODO:暂不删除，可能以后会用到 check
//     {
//       path: 'RecommendActivity',
//       name: 'RecommendActivity',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         templatePath: '/index/home',
//         pcname: 'RecommendActivity',
//         h5name: 'H5RecommendActivity',
//       },
//       component: resolve => require(['@/components/vue/RecommendedMaid'], resolve),
//     },
//     // 安卓上线
//     //TODO:要删除 check
//     {
//       path: 'androidOnline',
//       name: 'androidOnline',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         templatePath: '/index/home',
//         pcname: 'androidOnline',
//         h5name: 'AllAppDownLoad',
//       },
//       component: resolve => require(['@/components/vue/StaticAndroidOnline'], resolve),
//     },
//     // IOST奖励活动
//     // TODO:要删除 check
//     {
//       path: 'IOSTReward',
//       name: 'IOSTReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'IOSTReward',
//         h5name: 'H5IOSTReward',
//       },
//       component: resolve => require(['@/components/activity/vue/IOSTReward'], resolve),
//     },
//     // H5IOST奖励活动
//     //TODO:要删除 check
//     {
//       path: 'H5IOSTReward',
//       name: 'H5IOSTReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'IOSTReward',
//         h5name: 'H5IOSTReward',
//       },
//       component: resolve => require(['@/components/activity/vue/H5IOSTReward'], resolve),
//     },
//     // Mtc奖励活动
//     //TODO:要删除 check
//     {
//       path: 'MtcReward',
//       name: 'MtcReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'MtcReward',
//         h5name: 'H5MTCReward',
//       },
//       component: resolve => require(['@/components/activity/vue/MtcReward'], resolve),
//     },
//     // H5MTC奖励活动
//     //TODO:要删除 check
//     {
//       path: 'H5MTCReward',
//       name: 'H5MTCReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'MtcReward',
//         h5name: 'H5MTCReward',
//       },
//       component: resolve => require(['@/components/activity/vue/H5MTCReward'], resolve),
//     },
//     // Key奖励活动
//     //TODO:要删除 check
//     {
//       path: 'KeyReward',
//       name: 'KeyReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'KeyReward',
//         h5name: 'H5KEYReward',
//       },
//       component: resolve => require(['@/components/activity/vue/KeyReward'], resolve),
//     },
//     // H5KEY奖励活动
//     //TODO:要删除 check
//     {
//       path: 'H5KEYReward',
//       name: 'H5KEYReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'KeyReward',
//         h5name: 'H5KEYReward',
//       },
//       component: resolve => require(['@/components/activity/vue/H5KEYReward'], resolve),
//     },
//     // MTC活动三
//     //TODO:要删除 check
//     {
//       path: 'MtcActivity',
//       name: 'MtcActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'MtcActivity',
//         h5name: 'H5MtcActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/MtcActivity'], resolve),
//     },
//     // H5MTC活动三
//     //TODO:要删除 check
//     {
//       path: 'H5MtcActivity',
//       name: 'H5MtcActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'MtcActivity',
//         h5name: 'H5MtcActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/H5MtcActivity'], resolve),
//     },
//     // KEY活动三
//     //TODO:要删除 check
//     {
//       path: 'KeyActivity',
//       name: 'KeyActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'KeyActivity',
//         h5name: 'H5KeyActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/KeyActivity'], resolve),
//     },
//     // H5KEY活动三
//     //TODO:要删除 check
//     {
//       path: 'H5KeyActivity',
//       name: 'H5KeyActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'KeyActivity',
//         h5name: 'H5KeyActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/H5KeyActivity'], resolve),
//     },
//     // H5币世界注册活动
//     // TODO:要删除 check
//     {
//       path: 'H5BiShiJieRegister',
//       name: 'H5BiShiJieRegister',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         requireLoginOff: true,
//         mobileHeaderTitle: '',
//         pcname: '',
//         h5name: 'H5BiShiJieRegister',
//       },
//       component: resolve => require(['@/components/activity/vue/H5BiShiJieRegister'], resolve),
//     },
//
//     // H5币世界注册成功
//     // TODO:要删除 check
//     {
//       path: 'H5BiShiJieRegisterSuccess',
//       name: 'H5BiShiJieRegisterSuccess',
//       caseSensitive: true,
//       meta: {
//         requireLogin: true,
//         mobileHeaderTitle: '',
//         pcname: '',
//         h5name: 'H5BiShiJieRegisterSuccess',
//       },
//       component: resolve => require(['@/components/activity/vue/H5BiShiJieRegisterSuccess'], resolve),
//     },
//
//     // H5币世界活动
//     //TODO:要删除 check
//     {
//       path: 'H5BiShiJieActivity',
//       name: 'H5BiShiJieActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'BiShiJieActivity',
//         h5name: 'H5BiShiJieActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/H5BiShiJieActivity'], resolve),
//     },
//
//     // 币世界活动一和二
//     //TODO:要删除  check
//     {
//       path: 'BiShiJieActivity',
//       name: 'BiShiJieActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'BiShiJieActivity',
//         h5name: 'H5BiShiJieActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/BiShiJieActivity'], resolve),
//     },
//     // 币世界活动三
//     TODO:要删除  check
//     {
//       path: 'BiShiJieReward',
//       name: 'BiShiJieReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'BiShiJieReward',
//         h5name: 'H5BiShiJieReward',
//       },
//       component: resolve => require(['@/components/activity/vue/BiShiJieReward'], resolve),
//     },
//     // H5币世界活动三
//     //TODO:要删除 check
//     {
//       path: 'H5BiShiJieReward',
//       name: 'H5BiShiJieReward',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'BiShiJieReward',
//         h5name: 'H5BiShiJieReward',
//       },
//       component: resolve => require(['@/components/activity/vue/H5BiShiJieReward'], resolve),
//     },
//
//     // 活动页面模板，嵌入iframe
//     //TODO:要删除   check
//     {
//       path: 'ActivityIframe',
//       name: 'ActivityIframe',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: ''
//       },
//       component: resolve => require(['@/components/activity/vue/ActivityIframe'], resolve),
//     },
//
//     // 推荐返佣H5版
//
//     //TODO:不要删除  check
//     {
//       path: 'H5RecommendActivity',
//       name: 'H5RecommendActivity',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         templatePath: '/index/home',
//         pcname: 'RecommendActivity',
//         h5name: 'H5RecommendActivity',
//       },
//       component: resolve => require(['@/components/mobileVue/StaticH5RecommendedMaid'], resolve),
//     },
//     TODO:要删除 check
//     // 安卓上线H5版
//     // {
//     //   path: 'H5AndroidOnline',
//     //   name: 'H5AndroidOnline',
//     //   caseSensitive: true,
//     //   meta: {
//     //     requireLogin: false,
//     //     mobileHeaderTitle: '',
//     //     templatePath: '/index/home'
//     //   },
//     //   component: resolve => require(['@/components/mobileVue/StaticH5AndroidOnline'], resolve),
//     // },
//
//
//     //TODO:要删除 check
//     // 加入我们详情
//     {
//       path: 'joinUsDetail',
//       name: 'joinUsDetail',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         templateClose: false,
//         mobileHeaderTitle: '',
//         templatePath: '/index/home',
//         pcname: 'joinUsDetail',
//         h5name: '',
//       },
//       component: resolve => require(['@/components/vue/HelpJoinUsDetail'], resolve),
//     },
//      TODO:要删除 check
//     // 180607 H5挖矿分红说明页
//     {
//       path: 'MobileBTActivityHelp',
//       name: 'MobileBTActivityHelp',
//       caseSensitive: true,
//       meta: {
//         pcname: '',
//         h5name: 'MobileBTActivityHelp',
//       },
//       component: resolve => require(['@/components/btActivity/vue/MobileBTActivityHelp'], resolve),
//     },
//      TODO:要删除   check
//     // H5使用BDB燃料额外奖励 20180616
//     {
//       path: 'MobileUseBDBBurnRewards',
//       name: 'MobileUseBDBBurnRewards',
//
//       caseSensitive: true,
//       meta: {
//         pcname: '',
//         h5name: 'MobileUseBDBBurnRewards',
//         requireLogin: true,
//       },
//       component: resolve => require(['@/components/btActivity/vue/PersonalCenterMobileUseBDBBurnRewards'], resolve)
//     },
//      TODO:要删除   check
//     // 180608 H5挖矿分红收益记录页
//     {
//       path: 'MobileBTActivityProfitRecord',
//       name: 'MobileBTActivityProfitRecord',
//       caseSensitive: true,
//       meta: {
//         // todo 打开必须登录才能看此页面功能
//         requireLogin: false,
//         pcname: '',
//         h5name: 'MobileBTActivityProfitRecord',
//       },
//       //TODO:要删除
//       component: resolve => require(['@/components/btActivity/vue/MobileBTActivityProfitRecord'], resolve),
//       children: [
//         {
//           path: '',
//           caseSensitive: true,
//           redirect: 'MobileBTActivityTradingBTRecords',
//           meta: {
//             pcname: '',
//             h5name: 'MobileBTActivityTradingBTRecords',
//           },
//         },
//         //TODO:要删除
//         {
//           path: 'MobileBTActivityTradingBTRecords',
//           name: 'MobileBTActivityTradingBTRecords',
//           caseSensitive: true,
//           meta: {
//             pcname: '',
//             h5name: 'MobileBTActivityTradingBTRecords',
//           },
//           component: resolve => require(['@/components/btActivity/vue/MobileBTActivityTradingBTRecords'], resolve),
//         },
//
//         //TODO:要删除  check
//         {
//           path: 'MobileBTActivityGetBTRecords',
//           name: 'MobileBTActivityGetBTRecords',
//           caseSensitive: true,
//           meta: {
//             pcname: '',
//             h5name: 'MobileBTActivityGetBTRecords',
//           },
//           component: resolve => require(['@/components/btActivity/vue/MobileBTActivityGetBTRecords'], resolve),
//         },
//       ],
//     },
//  TODO: 要删除   check
    // 180608 H5挖矿分红平台历史页
    // {
    //   path: 'MobileBTActivityPlatformRecord',
    //   name: 'MobileBTActivityPlatformRecord',
    //   caseSensitive: true,
    //   meta: {
    //     pcname: '',
    //     h5name: 'MobileBTActivityPlatformRecord',
    //   },
    //   //TODO:要删除   check
    //   component: resolve => require(['@/components/btActivity/vue/MobileBTActivityPlatformRecord'], resolve),
    //   children: [
    //     {
    //       path: '',
    //       caseSensitive: true,
    //       redirect: 'MobileBTActivityPlatformRecordOutput',
    //       meta: {
    //         pcname: '',
    //         h5name: 'MobileBTActivityPlatformRecordOutput',
    //       },
    //     },
    //     {
    //       path: 'MobileBTActivityPlatformRecordOutput',
    //       name: 'MobileBTActivityPlatformRecordOutput',
    //       caseSensitive: true,
    //       meta: {
    //         pcname: '',
    //         h5name: 'MobileBTActivityPlatformRecordOutput',
    //       },
    //       component: resolve => require(['@/components/btActivity/vue/MobileBTActivityPlatformHistoryRecords'], resolve),
    //     },
    //
    //     {
    //       path: 'MobileBTActivityPlatformDividendRecords',
    //       name: 'MobileBTActivityPlatformDividendRecords',
    //       caseSensitive: true,
    //       meta: {
    //         pcname: '',
    //         h5name: 'MobileBTActivityPlatformDividendRecords',
    //       },
    //       component: resolve => require(['@/components/btActivity/vue/MobileBTActivityPlatformDividendRecords'], resolve),
    //     },
    //   ],
    // },
//
//     // 交易排位赛H5版
//
//     //TODO:要删除  check
//     {
//       path: 'H5RankActivity',
//       name: 'H5RankActivity',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         pcname: 'rankActivity',
//         h5name: 'H5RankActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/H5RankActivity'], resolve),
//     },
//
//     // 交易排位赛PC版
//
//     //TODO:不要删除 check
//     {
//       path: 'rankActivity',
//       name: 'rankActivity',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         pcname: 'rankActivity',
//         h5name: 'H5RankActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/rankActivity'], resolve),
//     },
//     // 交易排位赛H5版
//
//     //TODO:要删除  check
//     {
//       path: 'H5RechargeActivity',
//       name: 'H5RechargeActivity',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         pcname: 'RechargeActivity',
//         h5name: 'H5RechargeActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/H5RechargeActivity'], resolve),
//     },
//      //TODO:不能删除 check
//     // 充值大赛豪送QST PC版
//     {
//       path: 'RechargeActivity',
//       name: 'RechargeActivity',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         pcname: 'RechargeActivity',
//         h5name: 'H5RechargeActivity',
//       },
//       component: resolve => require(['@/components/activity/vue/RechargeActivity'], resolve),
//     },
//
//     // C2C临时页面
//     //TODO:要删除 check
//     {
//       path: 'c2cComing',
//       name: 'c2cComing',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         pcname: 'c2cComing',
//         h5name: 'c2cComing',
//       },
//       component: resolve => require(['@/components/vue/TemporaryC2CComingSoon'], resolve),
//     },
//
//     // 20170917 h5幸运预测活动
//     // 幸运预测活动参与记录
//     //TODO:要删除 没找到文件
    {
      path: 'mobileForecastJoinRecord',
      name: 'MobileForecastJoinRecord',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: '',
        h5name: 'MobileForecastJoinRecord',
      },
      component: resolve => require(['@/components/LuckyDraw/vue/MobileForecastJoinRecord'], resolve),
    },
//
//     // 幸运预测活动销毁记录
//     //TODO:要删除 没找到文件
    {
      path: 'mobileForecastDesdroyRecord',
      name: 'MobileForecastDesdroyRecord',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: '',
        h5name: 'MobileForecastDesdroyRecord',
      },
      component: resolve => require(['@/components/LuckyDraw/vue/MobileForecastDesdroyRecord'], resolve),
    },
//
//     // 开奖记录
//     //TODO:要删除 没找到文件  H5需要
    {
      path: 'mobileForecastRewardRecord',
      name: 'MobileForecastRewardRecord',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: '',
        h5name: 'MobileForecastRewardRecord',
      },
      component: resolve => require(['@/components/LuckyDraw/vue/MobileForecastRewardRecord'], resolve),
    },
// //
//      TODO:要删除 check
//     // 超级为蜜
//     {
//       path: 'superBee',
//       name: 'superBee',
//       caseSensitive: true,
//       meta: {
//         requireLogin: false,
//         mobileHeaderTitle: '',
//         pcname: 'superBee',
//         h5name: 'superBee',
//       },
//       component: resolve => require(['@/components/activity/vue/SuperBee'], resolve),
//     },
  ]
})

    // TODO 要删除 check
// // 2018年6月7日 BT活动
// root.routes.push({
//   path: '/bt',
//   // 注意，此处新建了一个标准化的组件，但担心会有统一的调整，如果有，使用StaticPage即可
//   component: resolve => require(['@/components/btActivity/vue/BtPage.vue'], resolve),
//   caseSensitive: true,
//   meta: {},
//   children: [
//     {
//       path: '',
//       redirect: 'btActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'btActivity',
//         h5name: 'MobileBTActivityHomePage',
//       }
//     },

//     // bt活动主页面
//     {
//       path: 'btActivity',
//       name: 'btActivity',
//       caseSensitive: true,
//       meta: {
//         mobileHeaderTitle: '',
//         pcname: 'btActivity',
//         h5name: 'MobileBTActivityHomePage',
//       },
//       component: resolve => require(['@/components/btActivity/vue/BtActivity.vue'], resolve),
//     },
//   ]
// })

// TODO 要删除  check
// 安卓上线H5版
// root.routes.push({
//   path: '/static/H5AndroidOnline',
//   name: 'H5AndroidOnline',
//   caseSensitive: true,
//   meta: {
//     requireLogin: false,
//     pcname: 'androidOnline',
//     h5name: 'H5AndroidOnline',
//   },
//   component: resolve => require(['@/components/mobileVue/StaticH5AndroidOnline'], resolve),
// })


// 关于我们页面
root.routes.push({
  path: '/index/aboutUs',
  caseSensitive: true,
  meta: {
    mobileHeaderTitle: '',
    pcname: 'aboutUs',
    h5name: '',
  },
  name: 'aboutUs',
  component: resolve => require(['@/components/vue/IndexAboutUs'], resolve),
})

// 新手指南页面
root.routes.push({
  path: '/index/beginnersGuide',
  caseSensitive: true,
  meta: {
    mobileHeaderTitle: '',
    pcname: 'beginnersGuide',
    h5name: '',
  },
  name: 'beginnersGuide',
  component: resolve => require(['@/components/vue/IndexbeginnersGuide'], resolve),
})



// 关于我们页面
root.routes.push({
  path: '/index/joinUs',
  caseSensitive: true,
  meta: {
    mobileHeaderTitle: '',
    pcname: 'joinUs',
    h5name: '',
  },
  name: 'joinUs',
  component: resolve => require(['@/components/vue/HelpJoinUs'], resolve),
})


// 首页
root.routes.push({
  path: '/index',
  redirect: 'home',
  caseSensitive: true,
  meta: {
    mobileHeaderTitle: '',
    pcname: 'home',
    h5name: 'NewH5homePage',
  },
  name: 'home',
  // component: resolve => require(['@/components/vue/IndexHome'], resolve),
})

// H5首页
root.routes.push({
  path: '/H5homePage',
  caseSensitive: true,
  redirect: '/index/newH5homePage',
  meta: {
    mobileHeaderTitle: ''
  },
  name: 'H5homePage',
  component: resolve => require(['@/components/mobileVue/H5HomePage'], resolve),
})

// 2018.4.4 新H5首页
// root.routes.push({
//   path: '/index/newH5homePage',
//   caseSensitive: true,
//   meta: {
//     mobileHeaderTitle: ''
//   },
//   name: 'H5homePage',
//   component: resolve => require(['@/components/mobileVue/newH5HomePage'], resolve),
// })

// {
//   path: '/H5homePage',
//     name: 'H5homePage',
//   meta: {
//   requireLogin: false,
//     mobileHeaderTitle: ''
// },
//   caseSensitive: true,
//     component: resolve => require(['@/components/mobileVue/H5HomePage'], resolve), //临时更改
// },


root.routes.push({
  path: '/huoDong',
  redirect: '/index/newH5homePage',
  // redirect: '/index/sign/login',
  caseSensitive: true,
  component: resolve => require(['@/components/mobileVue/MobilePromotion'], resolve)
})


// 首页index下的路由
root.routes.push({
  path: '/index',
  component: resolve => require(['@/components/vue/Index'], resolve),
  // component: resolve => require(['@/components/activity/vue/H5RankActivity'], resolve),
  // component: resolve => require(['@/components/activity/vue/RechargeActivity'], resolve),
  // component: resolve => require(['@/components/combinedCoinVote/vue/MobileCombinedVotePage'], resolve),
  // component: resolve => require(['@/components/LuckyDraw/vue/MobileForecastHomePage'], resolve),
  caseSensitive: true,
  children: [
    {
      path: 'home',
      name: 'home',
      // redirect: 'home',
      caseSensitive: true,
      meta: {
        mobileHeaderTitle: '',
        pcname: 'home',
        h5name: 'NewH5homePage',
      },
      component: resolve => require(['@/components/vue/IndexHome'], resolve),
    },
    // 首页
    {
      path: 'homePage',
      name: 'homePage',
      redirect: 'home',
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: 'home',
        h5name: 'NewH5homePage',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/vue/HomePage'], resolve), //临时更改
    },

    // 2018.4.4 新H5首页
    {
      path: 'newH5homePage',
      name: 'NewH5homePage',
      // redirect: 'h5home',
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: 'home',
        h5name: 'NewH5homePage',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/mobileVue/NewH5HomePage'], resolve),
    },




    {
      path: 'mobileHeatList',
      name: 'mobileHeatList',
      // redirect: 'h5home',
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: '',
        h5name: 'mobileHeatList',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/vue/MobileHeatList'], resolve),
    },


    {
      path: 'tradingHall',
      name: 'tradingHall',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        templateClose: false,
        mobileHeaderTitle: '',
        pcname: 'tradingHall',
        h5name: 'mobileTradingHall',
        templatePath: '/index/tradingHallT'
      },
      component: resolve => require(['@/components/vue/TradingHall'], resolve),
    },
    // 交易大厅临时页面
    // {
    //   path: 'tradingHallTemporary/xs241/sfe/sf214213/ts22/trade',
    //
    //   caseSensitive: true,
    //   meta: {
    //     requireLogin: false,
    //     templateClose: false,
    //     mobileHeaderTitle: '',
    //     templatePath: '/index/tradingHallT'
    //   },
    //   component: resolve => require(['@/components/vue/TradingHall'], resolve),
    // },
    {
      path: 'mobileTradingHall',
      name: 'mobileTradingHall',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        templateClose: false,
        mobileHeaderTitle: '交易大厅',
        pcname: 'tradingHall',
        h5name: 'mobileTradingHall',
        templatePath: '/index/tradingHallT'
      },
      component: resolve => require(['@/components/mobileVue/MobileTradingHall'], resolve),
    },
    // 交易大厅H5临时页面
    // {
    //   path: 'mobileTradingHallTemporary/ssx/egs/sgwe/123/24212/24555',
    //   caseSensitive: true,
    //   meta: {
    //     requireLogin: false,
    //     templateClose: false,
    //     mobileHeaderTitle: '交易大厅',
    //     templatePath: '/index/tradingHallT'
    //   },
    //   component: resolve => require(['@/components/mobileVue/MobileTradingHall'], resolve),
    // },
    {
      path: 'mobileTradingHallDetail',
      name: 'mobileTradingHallDetail',
      // caseSensitive: true,
      meta: {
        requireLogin: false,
        templateClose: false,
        mobileHeaderTitle: '',
        pcname: 'tradingHall',
        h5name: 'mobileTradingHallDetail',
      },
      component: resolve => require(['@/components/mobileVue/MobileTradingHallDetail'], resolve),
    },
    // 交易大厅H5临时开放etail
    // {
    //   path: 'mobileTradingHallDetailTemporary/ss/ewq123/dfa/23213/4433xx/temporary',
    //   caseSensitive: true,
    //   meta: {
    //     requireLogin: false,
    //     templateClose: false,
    //     mobileHeaderTitle: ''
    //   },
    //   component: resolve => require(['@/components/mobileVue/MobileTradingHallDetail'], resolve),
    // },

    {
      path: 'register',
      name: 'register',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        templateClose: false,
        requireLoginOff: true,
        mobileHeaderTitle: ''
      },
      component: resolve => require(['@/components/vue/Register'], resolve),
    },

    {
      path: 'RegisterMobilePhoneNumberAreaSearch',
      name: 'RegisterMobilePhoneNumberAreaSearch',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        templateClose: false,
        requireLoginOff: true,
        mobileHeaderTitle: ''
      },
      component: resolve => require(['@/components/vue/RegisterMobilePhoneNumberAreaSearch'], resolve),
    },

    // 登录相关
    {
      path: 'sign',
      caseSensitive: true,
      component: resolve => require(['@/components/vue/SignPage'], resolve),
      children: [
        // 默认路由登录
        {
          path: '',
          meta: {
            mobileHeaderTitle: ''
          },
          caseSensitive: true,
          redirect: 'login'
        },
        // 登录
        {
          path: 'login',
          name: 'login',
          meta: {
            requireLogin: false,
            templateClose: false,
            requireLoginOff: true,
            mobileHeaderTitle: ''
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/SignPageLogin'], resolve),
        },
        // 找回密码
        {
          path: 'findBackPsw',
          name: 'findBackPsw',
          caseSensitive: true,
          meta: {
            requireLogin: false,
            requireLoginOff: true,
            mobileHeaderTitle: ''
          },
          component: resolve => require(['@/components/vue/SignPageFindBackPassword'], resolve)
        },
        // 确认
        {
          path: 'verification',
          name: 'verification',
          meta: {
            requireLogin: false,
            templateClose: false,
            requireLoginOff: true,
            mobileHeaderTitle: ''
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/SignPageVerification'], resolve),
        },
        // 找回密码重置密码
        {
          path: 'resetPsw',
          name: 'resetPsw',
          meta: {
            requireLogin: false,
            templateClose: false,
            requireLoginOff: true,
            mobileHeaderTitle: ''
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/SignPageResetPassword'], resolve),
        },
      ]
    },
    // 公告路由  @liufei start
    {
      path: 'notice',
      name: 'notice',
      caseSensitive: true,
      component: resolve => require(['@/components/vue/NoticeCenter'], resolve),
      children: [
        // 列表
        {
          path: 'noticeCenter',
          name: 'noticeCenter',
          caseSensitive: true,
          meta: {
            pcname: 'noticeCenter',
            h5name: 'mobileNotice',
          },
          component: resolve => require(['@/components/vue/NoticeCenter'], resolve),
        },
        // {
        //   path:'',
        //   name:'noticezendesk',
        // },
        // 详情
        {
          path: 'noticeDetail',
          name: 'noticeDetail',
          caseSensitive: true,
          meta: {
            pcname: 'noticeDetail',
            h5name: 'mobileNoticeDetail',
          },
          component: resolve => require(['@/components/vue/NoticeDetail'], resolve),
        }
      ]
    },
    // 公告路由  @liufei end
    // h5公告路由  @rongjiaqi start
    // 公告列表
    {
      path: 'mobileNotice',
      name: 'mobileNotice',
      caseSensitive: true,
      meta: {
        pcname: 'noticeCenter',
        h5name: 'mobileNotice',
      },
      component: resolve => require(['@/components/mobileVue/MobileNotice'], resolve)
    },
    // 公告详情
    {
      path: 'mobileNoticeDetail',
      name: 'mobileNoticeDetail',
      caseSensitive: true,
      meta: {
        pcname: 'noticeDetail',
        h5name: 'mobileNoticeDetail',
      },
      component: resolve => require(['@/components/mobileVue/MobileNoticeDetail'], resolve)
    },
    // h5公告路由  @rongjiaqi end

    // 帮助路由  @liufei start
    {
      path: 'help',
      caseSensitive: true,
      component: resolve => require(['@/components/vue/Help'], resolve),
      children: [
        // 常见问题
        // {
        //   path: 'problem',
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/HelpProblem'], resolve),
        // },
        // // 提交工单
        {
          path: 'wordOrder',
          name: 'wordOrder',
          meta: {
            pcname: 'wordOrder',
            h5name: 'H5WordOrder',
            requireLogin: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/HelpWordOrder'], resolve),
        },

        {
          path: 'H5WordOrder',
          name: 'H5WordOrder',
          meta: {
            pcname: 'wordOrder',
            h5name: 'H5WordOrder',
            requireLogin: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/H5WordOrder'], resolve),
        },
        //
        // // 设置白名单 2018-06-20
        // {
        //   path: 'whiteList',
        //   name: 'whiteList',
        //   meta: {
        //     pcname: 'whiteList',
        //     h5name: '',
        //     requireLogin: false,
        //   },
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/whiteList/vue/whiteList'], resolve),
        // },


        {
          path: 'workOrderInfo',
          meta: {
            pcname: 'workOrderInfo',
            h5name: '',
            requireLogin: true,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/WorkOrderInfo'], resolve),
        },

        {
          path: 'workOrderList',
          name: 'workOrderList',
          meta: {
            pcname: 'workOrderList',
            h5name: '',
            requireLogin: true,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/WorkOrderList'], resolve),
        },
        // // 客户服务
        // {
        //   path: 'service',
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/HelpService'], resolve),
        // },
        // // 您的建议
        // {
        //   path: 'proposal',
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/HelpProposal'], resolve),
        // },
        // 上币申请
        {
          path: 'applyToList',
          name: 'applyToList',
          caseSensitive: true,
          meta: {
            pcname: 'applyToList',
            h5name: '',
            requireLogin: false,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/HelpApplyToList'], resolve),
        },
        // 二零二零用户协议
        {
          path: 'userAgreement',
          name: 'userAgreement',
          caseSensitive: true,
          meta: {
            pcname: 'userAgreement',
            h5name: 'userAgreement',
            requireLogin: false,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/HelpUserAgreement'], resolve),
        },
        // 二零二零隐私协议
        {
          path: 'userPrivacy',
          name: 'userPrivacy',
          caseSensitive: true,
          meta: {
            pcname: 'userPrivacy',
            h5name: 'userPrivacy',
            requireLogin: false,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/HelpuserPrivacy'], resolve),
        },
        // TODO:不能删除 check
        // 费率标准
        {
          path: 'rateStandard',
          name: 'rateStandard',
          caseSensitive: true,
          meta: {
            pcname: 'rateStandard',
            h5name: '',
            requireLogin: false,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/HelpRateStandard'], resolve),
        },
      ]
    },
    // 帮助路由  @liufei  end
    // 资产路由 pc端
    {
      path: 'asset',
      caseSensitive: true,
      meta: {
        requireLogin: true,
        templateClose: false,
        templatePath: '/index/assetPageT',
        requireLoginOff: false,
      },
      component: resolve => require(['@/components/vue/AssetPage'], resolve),
      children: [
        // 默认我的钱包
        {
          path: '',
          meta: {
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/assetPageT',
            requireLoginOff: false,
          },
          redirect: 'myWallet',
          caseSensitive: true,
        },

        // 资产概览
        // {
        //   path: 'overviewOfAssets',
        //   name: 'overviewOfAssets',
        //   meta: {
        //     pcname: 'overviewOfAssets',
        //     h5name: 'mobileOverviewOfAssets',
        //     requireLogin: true,
        //     templateClose: false,
        //     templatePath: '/index/assetPageT',
        //     requireLoginOff: false,
        //   },
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/OverviewOfAssets'], resolve),
        // },
        // 我的钱包
        {
          path: 'myWallet',
          name: 'myWallet',
          meta: {
            pcname: 'myWallet',
            h5name: 'mobileMyWallet',
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/assetPageT',
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/MyWallet'], resolve),
        },


        // 充值提现
        {
          path: 'rechargeAndWithdrawals',
          name: 'rechargeAndWithdrawals',
          meta: {
            pcname: 'rechargeAndWithdrawals',
            h5name: 'MobileAssetRechargeAndWithdrawals',
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/assetPageT',
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/AssetPageRechargeAndWithdrawals'], resolve),
        },

        // 主流账户
        {
          path: 'mainstreamAccount',
          name: 'mainstreamAccount',
          meta: {
            pcname: 'mainstreamAccount',
            h5name: 'MobilemainstreamAccount',
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/assetPageT',
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/MainstreamAccount'], resolve),
        },
        //临时打开充值提现页面
        // {
        //   path: 'rechargeAndWithdrawals/temporary/some/route/1vcjkq8f/1235m1ec/14sq/124s/t',
        //   meta: {
        //     requireLogin: true,
        //     templateClose: false,
        //     templatePath: '/index/assetPageT',
        //     requireLoginOff: false,
        //   },
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/temporary/AssetPageRechargeAndWithdrawalsTemporary.vue'], resolve),
        // },

        // 充值记录
        // {
        //   path: 'rechargeRecord',
        //   name: 'rechargeRecord',
        //   meta: {
        //     pcname: 'rechargeRecord',
        //     h5name: 'MobileAssetRechargeAndWithdrawRecord',
        //     requireLogin: true,
        //     templateClose: false,
        //     templatePath: '/index/asset/rechargeAndWithdrawals',
        //     // templatePath: '/index/assetPageT',
        //
        //     requireLoginOff: false,
        //   },
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/AssetPageRechargeRecord'], resolve),
        // },


        // 锁仓记录
        {
          path: 'lockingRecord',
          name: 'lockingRecord',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/assetPageT',
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/lockingRecord'], resolve),
          children:[
            {
              path: '',
              meta: {
                requireLogin: true,
                templateClose: false,
                templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              redirect: 'currentLockHouse',
              caseSensitive: true,
            },

            // 锁仓分红记录
            {
              path: 'currentLockHouse',
              name: 'currentLockHouse',
              meta: {
                pcname: 'currentLockHouse',
                h5name: 'MobileCurrentLockHouse',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/currentLockHouse'], resolve),
            },
            // 锁仓挖矿
            {
              path: 'lockAndMine',
              name: 'lockAndMine',
              meta: {
                pcname: 'lockAndMine',
                h5name: 'MobilelockAndMine',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/LockAndMine'], resolve),
            },
            // 锁仓学习
            {
              path: 'lockLearning',
              name: 'lockLearning',
              meta: {
                pcname: 'lockLearning',
                h5name: 'MobileLockLearning',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/lockLearning'], resolve),
            },


            // 历史锁仓分红记录
            {
              path: 'historyLockAndMine',
              name: 'historyLockAndMine',
              meta: {
                pcname: 'historyLockAndMine',
                h5name: 'MobileHistoryLockAndMine',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/HistoryLockAndMine'], resolve),
            },

            // 历史锁仓挖矿记录
            {
              path: 'historyLockHouse',
              name: 'historyLockHouse',
              meta: {
                pcname: 'historyLockHouse',
                h5name: 'MobileHistoryLockHouse',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/historyLockHouse'], resolve),
            },
            // 历史锁仓学习记录
            {
              path: 'historyLockLearning',
              name: 'historyLockLearning',
              meta: {
                pcname: 'historyLockLearning',
                h5name: 'MobileHistoryLockLearning',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/historyLockLearning'], resolve),
            },
          ]
        },



          {
            path: 'contractRecord',
            name: 'contractRecord',
            meta: {
              pcname: 'contractRecord',
              h5name: '',
              requireLogin: true,
              templateClose: false,
              requireLoginOff: false,
            },
            caseSensitive: true,
            component: resolve => require(['@/components/Contract/vue/ContractRecord'], resolve),
          },
        // 合约账户
        // {
        //   path: 'contractRecord',
        //   name: 'contractRecord',
        //   caseSensitive: true,
        //   meta: {
        //     requireLogin: true,
        //     templateClose: false,
        //     requireLoginOff: false,
        //   },
        //   component: resolve => require(['@/components/Contract/vue/ContractRecord'], resolve),
        //   // children:[
        //   //   {
        //   //     path: '',
        //   //     meta: {
        //   //       requireLogin: true,
        //   //       templateClose: false,
        //   //       requireLoginOff: false,
        //   //     },
        //   //     redirect: 'warehousePosition',
        //   //     caseSensitive: true,
        //   //   },
        //   //
        //   //   // 仓位记录
        //   //   {
        //   //     path: 'warehousePosition',
        //   //     name: 'warehousePosition',
        //   //     meta: {
        //   //       pcname: 'warehousePosition',
        //   //       h5name: '',
        //   //       requireLogin: true,
        //   //       templateClose: false,
        //   //       requireLoginOff: false,
        //   //     },
        //   //     caseSensitive: true,
        //   //     component: resolve => require(['@/components/Contract/vue/WarehousePosition'], resolve),
        //   //   },
        //   //
        //   //
        //   //   // 合约资产记录
        //   //   {
        //   //     path: 'propertyAssets',
        //   //     name: 'propertyAssets',
        //   //     meta: {
        //   //       pcname: 'propertyAssets',
        //   //       h5name: '',
        //   //       requireLogin: true,
        //   //       templateClose: false,
        //   //       requireLoginOff: false,
        //   //     },
        //   //     caseSensitive: true,
        //   //     component: resolve => require(['@/components/Contract/vue/PropertyAssets'], resolve),
        //   //   },
        //   //
        //   // ]
        // },


        {
          path: 'record',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/assetPageT',
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/record'], resolve),
          children:[

            {
              path: '',
              meta: {
                requireLogin: true,
                templateClose: false,
                templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              redirect: 'rechargeRecord',
              caseSensitive: true,
            },

            // 充值记录
            {
              path: 'rechargeRecord',
              name: 'rechargeRecord',
              meta: {
                pcname: 'rechargeRecord',
                h5name: 'MobileAssetRechargeAndWithdrawRecord',
                requireLogin: true,
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',

                requireLoginOff: false,
              },
              component: resolve => require(['@/components/vue/AssetPageRechargeRecord'], resolve),
              caseSensitive: true,
            },


            // 提现记录
            {
              path: 'withdrawalsRecord',
              name: 'withdrawalsRecord',
              meta: {
                pcname: 'withdrawalsRecord',
                h5name: 'MobileAssetRechargeAndWithdrawRecord',
                requireLogin: true,
                // 临时关闭
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/AssetPageWithdrawalsRecord'], resolve),
            },
            // 转账记录
            {
              path: 'transferRecord',
              name: 'transferRecord',
              meta: {
                pcname: 'transferRecord',
                h5name: 'MobileTransferRecord',
                requireLogin: true,
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',

                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/TransferRecord'], resolve),
            },
            // 划转记录
            {
              path: 'transferRecords',
              name: 'transferRecords',
              meta: {
                pcname: 'transferRecords',
                h5name: 'MobileTransferRecords',
                requireLogin: true,
                templateClose: false,
                templatePath: '/index/asset/rechargeAndWithdrawals',
                // templatePath: '/index/assetPageT',

                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/TransferList'], resolve),
            },

            // 挖矿奖励
            {
              path: 'miningReward',
              name: 'miningReward',
              meta: {
                pcname: 'miningReward',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/miningReward'], resolve),
            },

            // 平台奖励
            {
              path: 'platformReward',
              name: 'platformReward',
              meta: {
                pcname: 'platformReward',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/AssetPagePlatformReward'], resolve),
            },
            // 基金奖励
            {
              path: 'fundAward',
              name: 'fundAward',
              meta: {
                pcname: 'fundAward',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/fundProducts/vue/fundAward'], resolve),
            },
            // 热度奖励
            {
              path: 'heatReward',
              name: 'heatReward',
              meta: {
                pcname: 'heatReward',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/HeatReward'], resolve),
            },
            // 申购记录
            {
              path: 'purchase',
              name: 'purchase',
              meta: {
                pcname: 'purchase',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/Purchase'], resolve),
            },
            // 资金往来
            {
              path: 'capitalExchangePc',
              name: 'capitalExchangePc',
              meta: {
                pcname: 'capitalExchangePc',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                // templatePath: '/index/assetPageT',
                requireLoginOff: false,
              },
              caseSensitive: true,
              component: resolve => require(['@/components/vue/CapitalExchangePc'], resolve),
            },
          ]
        },







        // 提现记录临时页面
        // {
        //   path: 'withdrawalsRecord/temporary/some/route/2xws24351/12fsx/2144mdm/1233m3mfm2icm12/t',
        //   meta: {
        //     requireLogin: true,
        //     // 临时关闭
        //     templateClose: false,
        //     templatePath: '/index/asset/rechargeAndWithdrawals',
        //     // templatePath: '/index/assetPageT',
        //     requireLoginOff: false,
        //   },
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/AssetPageWithdrawalsRecord'], resolve),
        // },
      ]
    },

    {
      path: 'MobileHistoryOrder',
      name: 'MobileHistoryOrder',
      caseSensitive: true,
      meta: {
        pcname: 'historicalEntrust',
        h5name: 'MobileHistoryOrder',
        requireLogin: true,
        templateClose: false,
        requireLoginOff: false,
      },
      component: resolve => require(['@/components/vue/MobileHistoryOrder'], resolve),
    },

    {
      path: 'MobileHistoryDetail',
      name: 'MobileHistoryDetail',
      caseSensitive: true,
      meta: {
        pcname: '',
        h5name: 'MobileHistoryDetail',
        requireLogin: true,
        templateClose: false,
        requireLoginOff: false,
      },
      // MobileHistoryDetail
      component: resolve => require(['@/components/mobileVue/MobileHistoryDetail'], resolve),
    },

    // 资产路由 移动端 rongjiaqi
    {
      path: 'mobileAsset',
      caseSensitive: true,
      meta: {
        pcname: '',
        h5name: 'mobileAsset',
        requireLogin: true,
        templateClose: false,
        requireLoginOff: false,
      },
      component: resolve => require(['@/components/mobileVue/MobileAssetPage'], resolve),
      children: [
        // 默认身份认证
        {
          path: '',
          redirect: 'mobileAssetRechargeAndWithdrawals',
          meta: {
            pcname: 'rechargeAndWithdrawals',
            h5name: 'MobileAssetRechargeAndWithdrawals',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: ''
          },
          caseSensitive: true,
        },
        // 移动端资产页
        {
          path: 'mobileAssetRechargeAndWithdrawals',
          name: 'MobileAssetRechargeAndWithdrawals',
          meta: {
            pcname: 'rechargeAndWithdrawals',
            h5name: 'MobileAssetRechargeAndWithdrawals',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: '资产'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRechargeAndWithdrawals'], resolve),
        },
        // 移动端资产详情页
        {
          path: 'mobileAssetRechargeAndWithdrawalsDetail',
          name: 'MobileAssetRechargeAndWithdrawalsDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetRechargeAndWithdrawalsDetail',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRechargeAndWithdrawalsDetail'], resolve),
        },
        // 移动端充值列表页
        {
          path: 'mobileAssetRecharge',
          name: 'MobileAssetRecharge',
          meta: {
            pcname: '',
            h5name: 'MobileAssetRecharge',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: '充值'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRecharge'], resolve),
        },
        // 移动端充值详情页
        {
          path: 'mobileAssetRechargeDetail',
          name: 'MobileAssetRechargeDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetRechargeDetail',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: '充值详情'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRechargeDetail'], resolve),
        },
        // 移动端提现列表页
        {
          path: 'mobileAssetWithdraw',
          name: 'MobileAssetWithdraw',
          meta: {
            pcname: '',
            h5name: 'MobileAssetWithdraw',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: '提现'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetWithdraw'], resolve),
        },
        // 移动端提现详情页
        {
          path: 'mobileAssetWithdrawDetail',
          name: 'MobileAssetWithdrawDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetWithdrawDetail',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '提现详情'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetWithdrawDetail'], resolve),
        },
        // 移动端资金划转页
        {
          path: 'mobileAssetCapitalTransfer',
          name: 'MobileAssetCapitalTransfer',
          meta: {
            pcname: '',
            h5name: 'MobileAssetCapitalTransfer',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '资金划转'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetCapitalTransfer'], resolve),
        },
        // 移动端充提记录页
        {
          path: 'MobileAssetRechargeAndWithdrawRecord',
          name: 'MobileAssetRechargeAndWithdrawRecord',
          meta: {
            pcname: 'rechargeRecord',
            h5name: 'MobileAssetRechargeAndWithdrawRecord',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '充提记录'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRechargeAndWithdrawRecord'], resolve),
        },
        // 移动端锁仓记录页
        {
          path: 'MobileLockHouseRecord',
          name: 'MobileLockHouseRecord',
          meta: {
            pcname: 'LockHouseRecord',
            h5name: 'MobileLockHouseRecord',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '充提记录'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileLockHouseRecord'], resolve),
        },

        // 移动端充值记录详情页
        {
          path: 'mobileAssetRechargeRecordDetail',
          name: 'MobileAssetRechargeRecordDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetRechargeRecordDetail',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '充提记录'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRechargeRecordDetail'], resolve),
        },
        // 移动端提现记录详情页
        {
          path: 'mobileAssetWithdrawRecordDetail',
          name: 'MobileAssetWithdrawRecordDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetWithdrawRecordDetail',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '充提记录'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetWithdrawRecordDetail'], resolve),
        },// 移动端划转记录详情页
        {
          path: 'mobileAssetCapitalTransferRecordDetail',
          name: 'MobileAssetCapitalTransferRecordDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetCapitalTransferRecordDetail',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetCapitalTransferRecordDetail'], resolve),
        },// 移动端内部转账记录详情页
        {
          path: 'mobileAssetInternalTransferRecordDetail',
          name: 'MobileAssetInternalTransferRecordDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetInternalTransferRecordDetail',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetInternalTransferRecordDetail'], resolve),
        },// 移动端挖矿记录详情页
        {
          path: 'mobileAssetRewardRecordDetail',
          name: 'MobileAssetRewardRecordDetail',
          meta: {
            pcname: '',
            h5name: 'MobileAssetRewardRecordDetail',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/MobileAssetRewardRecordDetail'], resolve),
        },
        // 移动端奖励记录详情页
        {
          path: 'mobileAssetEventRewardsRecordDetail',
          name: 'mobileAssetEventRewardsRecordDetail',
          meta: {
            pcname: '',
            h5name: 'mobileAssetEventRewardsRecordDetail',
            requireLogin: true,
            // 临时关闭
            templateClose: false,
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/mobileAssetEventRewardsRecordDetail'], resolve),
        },
        // 移动当前锁仓记录详情页
        {
          path: 'mobileAssetcurLockRecordDetail',
          name: 'mobileAssetcurLockRecordDetail',
          meta: {
            pcname: '',
            h5name: 'mobileAssetcurLockRecordDetail',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '充提记录'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/mobileAssetcurLockRecordDetail'], resolve),
        },

        // 移动历史锁仓记录详情页
        {
          path: 'mobileAssetHisLockRecordDetail',
          name: 'mobileAssetHisLockRecordDetail',
          meta: {
            pcname: '',
            h5name: 'mobileAssetHisLockRecordDetail',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            // mobileHeaderTitle: '充提记录'
          },
          caseSensitive: true,
          component: resolve => require(['@/components/mobileVue/mobileAssetHisLockRecordDetail'], resolve),
        },


        // 移动端转账记录页
        {
          path: 'MobileTransfer',
          name: 'MobileTransfer',
          meta: {
            pcname: '',
            h5name: 'MobileTransfer',
            // requireLogin: 请求登录  templateClose：组件关闭
            // requireLoginOff：请求登录关闭  caseSensitive：区分大小写
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/MobileTransfer'], resolve),
        },

        // 移动端转账确认页
        {
          path: 'MobileConfirm',
          name: 'MobileConfirm',
          meta: {
            pcname: '',
            h5name: 'MobileConfirm',
            // requireLogin: 请求登录  templateClose：组件关闭
            // requireLoginOff：请求登录关闭  caseSensitive：区分大小写
            requireLogin: true,
            // templateClose: false,
            // requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/MobileConfirm'], resolve),
        },

        // 移动端转账成功页
        {
          path: 'MobileTransferSuccess',
          name: 'MobileTransferSuccess',
          meta: {
            pcname: '',
            h5name: 'MobileTransferSuccess',
            // requireLogin: 请求登录  templateClose：组件关闭
            // requireLoginOff：请求登录关闭  caseSensitive：区分大小写
            requireLogin: true,
            // templateClose: false,
            // requireLoginOff: false,
          },
          caseSensitive: true,
          component: resolve => require(['@/components/vue/MobileTransferSuccess'], resolve),
        },

        // 移动端转账记录
        // {
        //   path: 'MobileTransferRecords',
        //   name: 'MobileTransferRecords',
        //   meta: {
        //     pcname: '',
        //     h5name: 'MobileTransferRecords',
        //     // requireLogin: 请求登录  templateClose：组件关闭
        //     // requireLoginOff：请求登录关闭  caseSensitive：区分大小写
        //     requireLogin: true,
        //     // templateClose: false,
        //     // requireLoginOff: false,
        //   },
        //   caseSensitive: true,
        //   component: resolve => require(['@/components/vue/MobileTransferRecords'], resolve),
        // },
      ]
    },

    {
      path: 'personal',
      // name: 'personal',
      caseSensitive: true,
      meta: {
        requireLogin: true,
      },
      component: resolve => require(['@/components/vue/PersonalCenter'], resolve),
      children: [
        // 默认身份认证
        {
          path: '',
          redirect: 'auth',
          meta: {
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: '个人中心'
          },
          caseSensitive: true,
        },
        // 安全中心
        {
          path: 'securityCenter',
          name: 'securityCenter',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: ''
          },
          component: resolve => require(['@/components/vue/PersonalCenterSecurityCenter'], resolve),
          children: [
            // 安全中心默认
            {
              path: '',
              caseSensitive: true,
              name: 'securityCenter',
              meta: {
                pcname: 'securityCenter',
                h5name: 'authentication',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: ''
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterSecurityCenter'], resolve)
            },
            // 临时增加api
            // {
            //   path: 'templateApi',
            //   caseSensitive: true,
            //   meta: {
            //     requireLogin: true,
            //   },
            //   component: resolve => require(['@/components/vue/TemplateApi'], resolve)
            // },
            // 修改登录密码
            {
              path: 'modifyLoginPassword',
              name: 'modifyLoginPassword',

              caseSensitive: true,
              meta: {
                pcname: 'modifyLoginPassword',
                h5name: 'modifyLoginPassword',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: '修改密码'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterModifyLoginPassword'], resolve)
            },
            // // 设置资金密码
            // {
            //   path: 'setAssetPassword',
            //   caseSensitive: true,
            //   meta: {
            //     requireLogin: true,
            //   },
            //   component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterSetAssetPassword'], resolve)
            // },
            // // 修改资金密码
            // {
            //   path: 'modifyAssetPassword',
            //   caseSensitive: true,
            //   meta: {
            //     requireLogin: true,
            //   },
            //   component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterModifyAssetPassword'], resolve)
            // },
            // // 找回资金密码
            // {
            //   path: 'retrieveAssetPassword',
            //   caseSensitive: true,
            //   meta: {
            //     requireLogin: true,
            //   },
            //   component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterRetrieveAssetPassword'], resolve)
            // },
            // 绑定谷歌验证
            {
              path: 'bindGoogleAuthenticator',
              name: 'bindGoogleAuthenticator',

              caseSensitive: true,
              meta: {
                pcname: 'bindGoogleAuthenticator',
                h5name: 'MobileBindGoogleAuthenticator',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: ''
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterBindGoogleAuthenticator'], resolve)
            },
            //手机绑定谷歌验证码
            {
              path: 'MobileBindGoogleAuthenticator',
              name: 'MobileBindGoogleAuthenticator',

              caseSensitive: true,
              meta: {
                pcname: 'bindGoogleAuthenticator',
                h5name: 'MobileBindGoogleAuthenticator',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: ''
              },
              component: resolve => require(['@/components/mobileVue/MobileBindGoogleAuthenticator'], resolve)
            },
            //手机 去 绑定谷歌验证码
            {
              path: 'MobileGoBindGoogleAuthenticator',
              name: 'MobileGoBindGoogleAuthenticator',

              caseSensitive: true,
              meta: {
                pcname: '',
                h5name: 'MobileGoBindGoogleAuthenticator',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: ''
              },
              component: resolve => require(['@/components/mobileVue/MobileGoBindGoogleAuthenticator'], resolve)
            },
            //手机 去解绑 谷歌验证码
            {
              path: 'MobileReleaseGoogleAuthenticator',
              name: 'MobileReleaseGoogleAuthenticator',
              caseSensitive: true,
              meta: {
                pcname: 'releaseGoogleAuthenticator',
                h5name: 'MobileReleaseGoogleAuthenticator',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: ''
              },
              component: resolve => require(['@/components/mobileVue/MobileReleaseGoogleAuthenticator'], resolve)
            },
            // 解绑谷歌验证
            {
              path: 'releaseGoogleAuthenticator',
              name: 'releaseGoogleAuthenticator',
              caseSensitive: true,
              meta: {
                pcname: 'releaseGoogleAuthenticator',
                h5name: 'MobileReleaseGoogleAuthenticator',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: ''
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterReleaseGoogleAuthenticator'], resolve)
            },
            // 绑定手机号
            {
              path: 'bindMobile',
              name: 'bindMobile',
              caseSensitive: true,
              meta: {
                pcname: 'bindMobile',
                h5name: 'bindMobile',
                requireLogin: true,
                mobileHeaderTitle: '绑定手机号'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterBindMobile'], resolve)
            },
            // 解绑手机号
            {
              path: 'releaseMobile',
              name: 'releaseMobile',
              caseSensitive: true,
              meta: {
                pcname: 'releaseMobile',
                h5name: 'releaseMobile',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: '解绑手机号'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterReleaseMobile'], resolve)
            },
            // 绑定邮箱
            {
              path: 'bindEmail',
              name: 'bindEmail',
              caseSensitive: true,
              meta: {
                pcname: 'bindEmail',
                h5name: 'bindEmail',
                requireLogin: true,
                mobileHeaderTitle: '绑定邮箱'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterBindEmail'], resolve)
            },
            // 解绑邮箱
            {
              path: 'releaseEmail',
              name: 'releaseEmail',
              caseSensitive: true,
              meta: {
                pcname: 'releaseEmail',
                h5name: 'releaseEmail',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: '解绑邮箱'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterReleaseEmail'], resolve)
            },
            // 启用API
            {
              path: 'openApi',
              name: 'openApi',
              caseSensitive: true,
              meta: {
                pcname: 'openApi',
                h5name: 'openApi',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: '启用API'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterOpenApi'], resolve)
            },
            // 管理API
            {
              path: 'manageApi',
              name: 'manageApi',
              caseSensitive: true,
              meta: {
                pcname: 'manageApi',
                h5name: 'manageApi',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: '管理API'
              },
              component: resolve => require(['@/components/vue/PersonalCenterSecurityCenterManageApi'], resolve)
            },
            // sss 会员卡
            {
              path: 'membershipCard',
              name: 'membershipCard',
              caseSensitive: true,
              meta: {
                pcname: 'membershipCard',
                // h5name: 'membershipCard',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,

              },
              component: resolve => require(['@/components/vue/MembershipCard'], resolve),
            },
            // sss 热度列表
            {
              path: 'heatList',
              name: 'heatList',
              caseSensitive: true,
              meta: {
                pcname: 'heatList',
                // h5name: 'membershipCard',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,

              },
              component: resolve => require(['@/components/vue/HeatList'], resolve),
            },

          ]
        },
        // 安全日志
        {
          path: 'securityLog',
          name: 'securityLog',
          caseSensitive: true,
          meta: {
            pcname: 'securityLog',
            h5name: '',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/PersonalCenterSecurityLog'], resolve)
        },
        // 我的推荐，此处为
        {
          path: 'Recommend',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
            mobileHeaderTitle: ''
          },
          component: resolve => require(['@/components/vue/PersonalCenterRecommendRoute'], resolve),
          children: [
            {
              path: '',
              redirect: 'PcRecommend',
              meta: {
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
                mobileHeaderTitle: '个人中心'
              },
              caseSensitive: true,
            },
            {
              path: 'PcRecommend',
              name: 'Recommend',
              caseSensitive: true,
              meta: {
                pcname: 'PcRecommend',
                h5name: 'H5Recommend',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
              },
              component: resolve => require(['@/components/vue/PersonalCenterRecommend'], resolve)
            },
            {
              path: 'BtActivityRecommend',
              name: 'BtActivityRecommend',
              caseSensitive: true,
              meta: {
                pcname: 'BtActivityRecommend',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
              },
              component: resolve => require(['@/components/btActivity/vue/BtActivityMyRecommend'], resolve)
            },
          ]
        },

        // H5我的推荐
        {
          path: 'H5Recommend',
          name: 'H5Recommend',

          caseSensitive: true,
          meta: {
            pcname: 'PcRecommend',
            h5name: 'H5Recommend',
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/mobileVue/PersonalCenterH5Recommend'], resolve)
        },

        // H5我的专属海报
        // {
        //   path: 'H5PosterInvitation',
        //   name: 'H5PosterInvitation',
        //
        //   caseSensitive: true,
        //   meta: {
        //     pcname: '',
        //     h5name: 'H5PosterInvitation',
        //     requireLogin: true,
        //     templateClose: false,
        //     requireLoginOff: false,
        //   },
        //   component: resolve => require(['@/components/mobileVue/PersonalCenterH5PosterInvitation'], resolve)
        // },
        // 安全策略
        // {
        //   path: 'securityStrategy',
        //   caseSensitive: true,
        //   meta: {
        //     requireLogin: true,
        //   },
        //   component: resolve => require(['@/components/vue/PersonalCenterSecurityStrategy'], resolve)
        // },


        // 身份认证
        {
          path: 'auth',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            templateClose: false,
            requireLoginOff: false,
          },
          component: resolve => require(['@/components/vue/PersonalCenterAuth'], resolve),
          children: [
            // 默认认证状态
            {
              path: '',
              caseSensitive: true,
              meta: {
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
              },
              redirect: 'authentication'
            },
            // 认证状态
            {
              path: 'authentication',
              name: 'authentication',
              caseSensitive: true,
              meta: {
                pcname: 'authentication',
                h5name: 'authentication',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
              },
              component: resolve => require(['@/components/vue/PersonalCenterAuthAuthenticationState'], resolve)
            },
            // 去认证
            {
              path: 'authenticate',
              name: 'authenticate',
              caseSensitive: true,
              meta: {
                pcname: 'authenticate',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
              },
              component: resolve => require(['@/components/vue/PersonalCenterAuthToAuthenticate'], resolve)
            },
            //燃烧BDB收益
            {
              path: 'burnBDBProfit',
              name: 'burnBDBProfit',
              caseSensitive: true,
              meta: {
                pcname: 'burnBDBProfit',
                h5name: '',
                requireLogin: true,
                templateClose: false,
                requireLoginOff: false,
              },
              component: resolve => require(['@/components/btActivity/vue/BtActivityBDBBurnProfit'], resolve)
            },

          ]
        },
        // 我的为蜜
        // {
        //   path: 'mySuperBee',
        //   name: 'mySuperBee',
        //   caseSensitive: true,
        //   meta: {
        //     pcname: 'mySuperBee',
        //     h5name: '',
        //     requireLogin: true,
        //     templateClose: false,
        //     requireLoginOff: false,
        //   },
        //   component: resolve => require(['@/components/vue/PersonalCenterMySuperBee'], resolve)
        // },
        // TODO:要删除
        // 挖矿收益
        // {
        //   path: 'btActivity',
        //   name: 'btActivity',
        //   caseSensitive: true,
        //   meta: {
        //     mobileHeaderTitle: '',
        //     pcname: 'btActivity',
        //     h5name: 'MobileBTActivityHomePage',
        //     requireLogin: true,
        //   },
        //   component: resolve => require(['@/components/btActivity/vue/BtActivity.vue'], resolve),
        // },
      ]
    },

    // 行情
    {
      path: 'indexHomeMarket',
      name: 'indexHomeMarket',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: 'indexHomeMarket',
        h5name: 'mobileTradingHall',
      },
      component: resolve => require(['@/components/vue/IndexHomeMarket'], resolve),
    },

    // sss 拼团
    {
      path: 'assembleARegiment',
      name: 'assembleARegiment',
      caseSensitive: true,
      meta: {
        requireLogin: true,
        mobileHeaderTitle: '',
        pcname: 'assembleARegiment',
        h5name: 'assembleARegiment',
        requireLoginOff: false,
        // h5name: 'mobileTradingHall',
      },
      component: resolve => require(['@/components/vue/AssembleARegiment'], resolve),
    },
    // sss 拼团--创建团队
    {
      path: 'createAGroup',
      name: 'createAGroup',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: 'createAGroup',
        h5name: 'createAGroup',
        // h5name: 'mobileTradingHall',
      },
      component: resolve => require(['@/components/vue/CreateAGroup'], resolve),
    },
    // sss 拼团--加入拼团
    {
      path: 'joinAGroup',
      name: 'joinAGroup',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: 'joinAGroup',
        h5name: 'joinAGroup',
        // h5name: 'mobileTradingHall',
      },
      component: resolve => require(['@/components/vue/JoinAGroup'], resolve),
    },
    // sss 拼团--拼团详情
    {
      path: 'detailsOfTheGroup',
      name: 'detailsOfTheGroup',
      caseSensitive: true,
      meta: {
        requireLogin: false,
        mobileHeaderTitle: '',
        pcname: 'detailsOfTheGroup',
        h5name: 'detailsOfTheGroup',
      },
      component: resolve => require(['@/components/vue/DetailsOfTheGroup'], resolve),
    },



    // TODO：弹框组件临时显示（记得删除）
    // {
    //   path: 'PopPublic',
    //   name: 'PopPublic',
    //   caseSensitive: true,
    //   component: resolve => require(['@/components/vue/PopPublic'], resolve),
    //   // meta: {
    //   //   pcname: 'historicalEntrust',
    //   //   h5name: 'MobileHistoryOrder',
    //   //   requireLogin: true,
    //   //   templateClose: false,
    //   //   templatePath: '/index/orderPageT',
    //   //   requireLoginOff: false,
    //   // },
    // },


    // 订单
    {
      path: 'order',
      caseSensitive: true,
      meta: {
        requireLogin: true,
      },
      component: resolve => require(['@/components/vue/OrderPage'], resolve),
      children: [
        // 默认当前订单
        {
          path: '',
          redirect: 'currentEntrust',

          caseSensitive: true,
          meta: {
            pcname: 'currentEntrust',
            h5name: 'mobileTradingHallDetail',
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/orderPageT',
            requireLoginOff: false,
          },
        },
        // 当前订单
        {
          path: 'currentEntrust',
          name: 'currentEntrust',
          caseSensitive: true,
          component: resolve => require(['@/components/vue/OrderPageCurrentEntrustment'], resolve),
          meta: {
            pcname: 'currentEntrust',
            h5name: 'mobileTradingHallDetail',
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/orderPageT',
            requireLoginOff: false,
          },
        },
        // 历史订单
        {
          path: 'historicalEntrust',
          name: 'historicalEntrust',
          caseSensitive: true,
          component: resolve => require(['@/components/vue/OrderPageHistoricalEntrustment'], resolve),
          meta: {
            pcname: 'historicalEntrust',
            h5name: 'MobileHistoryOrder',
            requireLogin: true,
            templateClose: false,
            templatePath: '/index/orderPageT',
            requireLoginOff: false,
          },
        },

      ]
    },

    // TODO:要删除 check
    // {
    //   path: 'tradingHallT',
    //   caseSensitive: true,
    //   component: resolve => require(['@/components/vue/TemplateCloseTradingHall'], resolve),
    //   meta: {},
    // },

    // TODO:要删除 check
    // {
    //   path: 'assetPageT',
    //   caseSensitive: true,
    //   component: resolve => require(['@/components/vue/TemplateCloseAssetPage'], resolve),
    //   meta: {
    //     requireLogin: true,
    //   },
    // },

    // TODO:要删除 check
    // {
    //   path: 'orderPageT',
    //   caseSensitive: true,
    //   component: resolve => require(['@/components/vue/TemplateCloseOrderPage'], resolve),
    //   meta: {
    //     requireLogin: true,
    //   },
    // },

    // sss 活动------KK交易挖矿报名
    {
      path: 'officialQuantitativeRegistration',
      name: 'officialQuantitativeRegistration',
      caseSensitive: true,
      meta: {
        requireLogin: true,
        mobileHeaderTitle: '',
        pcname: 'officialQuantitativeRegistration',
        h5name: 'officialQuantitativeRegistration',
        requireLoginOff: false,

      },
      component: resolve => require(['@/components/vue/OfficialQuantitativeRegistration'], resolve),
    },

    // sss 活动------KK交易挖矿详情
    {
      path: 'officialQuantitativeDetails',
      name: 'officialQuantitativeDetails',
      caseSensitive: true,
      meta: {
        requireLogin: true,
        requireLoginOff: false,
        mobileHeaderTitle: '',
        pcname: 'officialQuantitativeDetails',
        h5name: 'officialQuantitativeDetails',

      },
      component: resolve => require(['@/components/vue/OfficialQuantitativeDetails'], resolve),
    },

    /*-----------------  基金理财PC begin  ------------------------*/
// 基金理财
    {
      path: 'financialFund',
      name: 'financialFund',
      requireLogin: true,
      caseSensitive: true,
      meta: {
        requireLogin: true,
        pcname: 'financialFund',
        h5name: '',
      },
      component: resolve => require(['@/components/fundProducts/vue/FinancialFund'], resolve),
      children:[
        {
          path: '',
          caseSensitive: true,
          redirect: 'fundProducts',
          meta: {
            pcname: 'fundProducts',
            h5name: 'fundProducts',
          },
        },
        // 基金产品页面
        {
          path: 'fundProducts',
          name:'fundProducts',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            pcname: 'fundProducts',
            h5name: '',
          },
          component: resolve => require(['@/components/fundProducts/vue/FundProducts'], resolve),
        },

        // 基金资产页面
        {
          path: 'fundAssets',
          name: 'fundAssets',
          caseSensitive: true,
          meta: {
            requireLogin: true,
            pcname: 'fundAssets',
            h5name: '',
          },
          component: resolve => require(['@/components/fundProducts/vue/FundAssets'], resolve),
        },
      ]
    },
    //基金理财购买
    {
      path: 'fundBuy',
      name: 'fundBuy',
      meta: {
        requireLogin: true,
        pcname: 'fundBuy',
        h5name: '',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/fundProducts/vue/FundBuy'], resolve)
    },
    /*-----------------  基金理PC end  ------------------------*/


    /*-----------------  跟单PC begin  ------------------------*/
     //PC  跟单首页
    {
      path: 'followTrade',
      name: 'followTrade',
      meta: {
        requireLogin: true,
        pcname: 'followTrade',
        h5name: 'mobileFollowTrade',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/followTrade/vue/FollowTrade'], resolve)
    },
    // 大神跟单页面
    {
      path: 'documentaryGod',
      name: 'documentaryGod',
      meta: {
        requireLogin: true,
        pcname: 'documentaryGod',
        h5name: 'mobileDocumentaryGod',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/followTrade/vue/DocumentaryGod'], resolve)
    },
    // 我的镜像交易
    {
      path: 'myFollowOrder',
      name: 'myFollowOrder',
      meta: {
        requireLogin: true,
        pcname: 'myFollowOrder',
        h5name: 'mobileMyFollowOrder',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/followTrade/vue/MyFollowOrder'], resolve)
    },
    {
      path: 'tapeListManage',
      name: 'tapeListManage',
      meta: {
        requireLogin: true,
        pcname: 'tapeListManage',
        h5name: 'mobileTapeListManage',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/followTrade/vue/TapeListManage'], resolve)
    },
    // 自己跟单页面
    {
      path: 'followTradeStrategy',
      name: 'followTradeStrategy',
      meta: {
        requireLogin: true,
        pcname: 'followTradeStrategy',
        h5name: 'mobileFollowTradeStrategy',
      },
      caseSensitive: true,
      component: resolve => require(['@/components/followTrade/vue/FollowTradeStrategy'], resolve)
    }


    // TODO:不能删除 check
    // cc 活动------茶币路由
    // {
    //   path: 'TeaCoinActivities',
    //   name: 'TeaCoinActivities',
    //   caseSensitive: true,
    //   meta: {
    //     requireLogin: false,
    //     mobileHeaderTitle: '',
    //     name: 'TeaCoinActivities',
    //   },
    //   component: resolve => require(['@/components/vue/TeaCoinActivities'], resolve),
    // },

    // TODO:不能删除 check
    // cc 活动-----茶叁茶源
    // {
    //   path: 'TeaSource',
    //   name: 'TeaSource',
    //   caseSensitive: true,
    //   meta: {
    //     requireLogin: false,
    //     mobileHeaderTitle: '',
    //     name: 'TeaSource',
    //   },
    //   component: resolve => require(['@/components/vue/TeaSource'], resolve),
    // },
     // TODO:要删除  check
    // 20180529 app下载页
    // // 扫一扫下载app
    // {
    //   path: 'AllAppDownLoad',
    //   name: 'AllAppDownLoad',
    //   caseSensitive: true,
    //   meta: {
    //     pcname: 'androidOnline',
    //     h5name: 'AllAppDownLoad',
    //   },
    //   component: resolve => require(['@/components/AppDownLoad/AllAppDownLoad.vue'], resolve),
    // },
    //
    // // 扫一扫下载app
    // {
    //   path: 'AppDownLoad',
    //   name: 'AppDownLoad',
    //   caseSensitive: true,
    //   meta: {
    //     pcname: 'androidOnline',
    //     h5name: 'AppDownLoad',
    //   },
    //   component: resolve => require(['@/components/AppDownLoad/AppDownLoad.vue'], resolve),
    // },
  ]
})


export default root
