const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed controller', function() {

    it('should create a post successfully', async function () {
        const userId = '507f1f77bcf86cd799439011';

        const user = {
            _id: userId,
            name: 'Test User',
            posts: {
                push: sinon.spy()
            },
            save: sinon.stub().resolves()
        };

        const json = sinon.spy();

        const res = {
            status: sinon.stub().returns({ json })
        };

        const next = sinon.spy();

        sinon.stub(Post.prototype, 'save').resolves();
        sinon.stub(User, 'findById').resolves(user);

        const socket = require('../socket');
        sinon.stub(socket, 'getIO').returns({
            emit: sinon.spy()
        });

        const req = {
            userId,
            body: {
                title: 'A valid post title',
                content: 'This is valid post content'
            },
            file: {
                path: 'images/test-image.jpg'
            }
        };

        try {
            await FeedController.createPost(req, res, next);

            expect(Post.prototype.save.calledOnce).to.equal(true);
            expect(User.findById.calledOnceWith(userId)).to.equal(true);
            expect(user.posts.push.calledOnce).to.equal(true);
            expect(user.save.calledOnce).to.equal(true);

            expect(res.status.calledOnceWith(201)).to.equal(true);
            expect(json.calledOnce).to.equal(true);

            expect(json.firstCall.args[0]).to.include({
                message: 'Post created successfuly'
            });

            expect(next.notCalled).to.equal(true);
        } finally {
            Post.prototype.save.restore();
            User.findById.restore();
            socket.getIO.restore();
        }
    });

});