const socketIo = require('socket.io');
const User = require('../model/userModal');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on('connection', (socket) => {
        let userId; 

        socket.on('online-user', async (onlineUserId) => {
            userId = onlineUserId;
            if(userId){
                try {
                    await User.findByIdAndUpdate(userId, { is_online: true });
                    const user = await User.findById({_id: userId});
                    io.emit(`fetch_user_status`, {
                        is_online: true,
                        message: `${user.userName} is online`
                    });
                } catch (err) {
                    console.error('Error updating user activity:', err);
                }
            }
        });

        socket.on('disconnect', async () => {
            if (userId) {
                try {
                    await User.findByIdAndUpdate(userId, { is_online: false });
                    const user = await User.findById({_id: userId});
                    io.emit(`fetch_user_status`, {
                        is_online: false,
                        message: `${user.userName} went offline`
                    });
                } catch (err) {
                    console.error('Error updating user activity:', err);
                }
            }
        });
    });

    return io;
}

module.exports = {
    initializeSocket,
    getIoInstance: () => io,
};
