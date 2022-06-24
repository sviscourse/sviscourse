import crypto from 'crypto';

export const randomString = (len: number) =>
	crypto.randomBytes(len).toString('base64');
