// When POST is sent to this route
export async function post(req, res, next) {
	req.session.user = null
	res.end()
}