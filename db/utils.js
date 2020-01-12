const jwt = require('jsonwebtoken')

const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  return null
}

async function getUser(context) {
  const id = getUserId(context)
  return id == null ? null : await context.prisma.user({ id })
}

module.exports = {
	APP_SECRET,
  getUserId,
  getUser
}