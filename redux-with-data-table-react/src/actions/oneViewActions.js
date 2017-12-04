export const showTab = text => {
	console.log('show tab:', text);
	switch (text){
		 case "roaster":
			  return {
			    type: 'SHOW_ROASTER_TAB',
			}
	    case "status":
	    	  return {
	    		type: 'SHOW_STATUS_TAB',
	  		}
	    default:
	    	  return {
	    		type: 'SHOW_ROASTER_TAB',
	  		}
  	}
};
export default showTab;