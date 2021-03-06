
export let data = [
    {
        status: 200,
        method_name: "getAll",
        text: {
            eng: "An SMS has been sent to your e-mail. Confirm the sms to register!",
            ru: "На вашу электронную почту отправлено SMS. Подтвердите смс для регистрации!",
            uz: "Sizning elektron pochtangizga SMS yuborildi. Ro'yxatdan o'tish uchun smsni tasdiqlang!"
        },
        model_name: "tastiqla"
    }, {
        status: 400,
        method_name: "error",
        text: {
            eng: "Sms code is wrong",
            ru: "Код смс неверный",
            uz: "SMS kodi noto'g'ri"
        },
        model_name: "sms"
    },
    {
        status: 401,
        method_name: "error",
        text: {
            eng: "You are about to sign up with a fake email!",
            ru: "Вы собираетесь подписаться с поддельным адресом электронной почты!",
            uz: "Siz soxta elektron pochta orqali ro'yxatdan o'tmoqchisiz!"
        },
        model_name: "email"
    },
    {
        status: 401,
        method_name: "error",
        text: {
            eng: "Only the first letters of  firstname and lastname should be in capital and english letters",
            ru: "Только первые буквы имени и фамилии должны быть заглавными и английскими буквами.",
            uz: "Faqat ism va familiyaning birinchi harflari katta va ingliz harflarida bo'lishi kerak"
        },
        model_name: "ism"
    },
    {
        status: 403,
        method_name: "error",
        text: {
            eng: "Passsword is incorrect!",
            ru: "Неверный пароль!",
            uz: "Parol noto'g'ri!"
        },
        model_name: "password"
    },
    {
        status: 403,
        method_name: "error",
        text: {
            eng: "Enter your verified email",
            ru: "Введите ваш подтвержденный адрес электронной почты",
            uz: "Tasdiqlangan elektron pochtangizni kiriting"
        },
        model_name: "approved"
    },
    {
        status: 403,
        method_name: "error",
        text: {
            eng: "You do not have permission to this operation!",
            ru: "У вас нет разрешения на эту операцию!",
            uz: "Sizda bu operatsiyaga ruxsat yo'q!"
        },
        model_name: "operation"
    },
    {
        status: 404,
        method_name: "error",
        text: {
            eng: "User is not found",
            ru: "Пользователь не найдено",
            uz: "Foydalanuvchi topilmadi"
        },
        model_name: "user"
    }
]
