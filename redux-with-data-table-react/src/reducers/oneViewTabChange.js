let defaultState = {
    oneViewtab: "roaster"
};
export const oneViewTabChange = (state = defaultState, action) => {
	switch(action.type){
		case 'SHOW_ROASTER_TAB' :
			return Object.assign({}, state, {
        		oneViewtab: "roaster"
     	 	});
     	 case 'SHOW_STATUS_TAB' :
			return Object.assign({}, state, {
        		oneViewtab: "status"
     	 	});
		default:
			return state;
	}
}
export default oneViewTabChange;