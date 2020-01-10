function postedBy(root, args, context) {
	return context.prisma.post({id: root.id}).postedBy()
}

module.exports = {
	postedBy
}