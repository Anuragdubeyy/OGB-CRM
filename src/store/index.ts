import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices';

const store =configureStore({
    reducer:{
        authState: reducers.login,
        apiMessage: reducers.apiMessage,
        loader: reducers.loader,
        adminInfo: reducers.adminInfo,
        checkUser: reducers.checkUser,
        todayGoldRate: reducers.todayGoldRate,
        notification: reducers.notification,
        dashboardOverview:reducers.dashboardOverview,
        allAlert:reducers.allAlert,
        dashboardWithdraw: reducers.dashboardWithdraw,
        dashboardBarter: reducers.dashboardBarter,
        dashboardDisplay: reducers.dashboardDisplay,
        dashboardImmediateSell: reducers.dashboardImmediateSell,
        barterAvailable: reducers.barterAvailable,
        barterGiven: reducers.barterGiven,
        barterHistory: reducers.barterHistory,
        customerDeposit:reducers.customerDeposit,
        customerWithdraw:reducers.customerWithdraw,
        customerOrder:reducers.customerOrder,
        customerOtcHome:reducers.customerOtcHome,
        customerOtcWithdraw:reducers.customerOtcWithdraw,
        customerOtcBarter:reducers.customerOtcBarter,
        customerOtcBarterList:reducers.customerOtcBarterList,
        customerOtcDisplay:reducers.customerOtcDisplay,
        customerOtcImmediateSell:reducers.customerOtcImmediateSell,
        customerOtcAddOrnaments:reducers.customerOtcAddOrnaments,
        depositOrnaments: reducers.depositOrnaments,
        displayOrnaments: reducers.displayOrnaments,
        withdrawnOrnaments: reducers.withdrawnOrnaments,
        lockerOrnaments: reducers.lockerOrnaments,
        soldOrnaments: reducers.soldOrnaments,
        categoriesOrnaments: reducers.categoriesOrnaments,
        byOrder: reducers.byOrder,
        premiumCollection: reducers.premiumCollection,
        privilegeMembers: reducers.privilegeMembers,
        privilegeUser: reducers.privilegeUser,
        privilegeLoans: reducers.privilegeLoans,
        registerCustomer: reducers.registerCustomer,
        addAdmin: reducers.addAdmin,
        registerLocker: reducers.registerLocker,













    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;