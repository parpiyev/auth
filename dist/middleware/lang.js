"use strict";
// import { NextFunction, Request, Response } from 'express'
// export const langMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const languages = {
//         eng: 'eng',
//         ru: 'ru',
//         uz: 'uz'
//     } as { [filedname: string]: string }
//     let { lang } = req.headers as { lang: string }
//     console.log(lang, 'lang');
//     if (!lang) lang = 'eng'
//     else if (!languages[lang]) lang = 'eng'
//     res.locals.lang = lang
//     console.log(res.locals.lang, 'la');
//     next()
// }
