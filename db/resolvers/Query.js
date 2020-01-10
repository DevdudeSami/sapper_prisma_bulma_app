function userPosts(root, args, context) {
	return context.prisma.user({id: args.id}).posts()
}

module.exports = {
	userPosts
}