const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];
const ADMIN_NAME = "Admin_Boss"; // Lưu ý gõ đúng tên này khi test

app.get('/', (req, res) => {
    res.render('index', { role: null, name: null, users: [] });
});

app.post('/register', (req, res) => {
    // Lấy tên và xóa khoảng trắng dư thừa
    const username = req.body.username ? req.body.username.trim() : "";

    // So sánh không phân biệt hoa thường
    const role = (username.toLowerCase() === ADMIN_NAME.toLowerCase()) ? "Admin" : "User";

    users.push({ username, role });

    // Gửi dữ liệu sang index.ejs
    res.render('index', {
        role: role,
        name: username,
        users: users
    });
});

// Thay vì app.listen(3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});