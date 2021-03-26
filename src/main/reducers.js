import { combineReducers } from 'redux'
import { reducer as formReducer  } from 'redux-form'
import { reducer as toastrReducer  } from 'react-redux-toastr'

import TabReducer from '../common/tab/tabReducer'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'
import AuthReducer from '../auth/authReducer'
import PostoReducer from '../posto/postoReducer'

const rootReducer = combineReducers({
    tab: TabReducer,
    billingCycle: BillingCycleReducer,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer,
    posto: PostoReducer
})

export default rootReducer;