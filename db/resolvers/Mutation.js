function createPost(root, args, context) {
	return context.prisma.createPost({
		text: args.text,
		postedBy: {connect: {id: args.userID}}
	})
}

module.exports = {
	createPost
}