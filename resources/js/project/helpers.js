export const convertDate = string => {
	
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const date = new Date(string)

	return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes()
}