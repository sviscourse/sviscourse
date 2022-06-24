import { decodeProtectedHeader, importX509, jwtVerify } from 'jose';
import { fetchJson } from './net';

export const verifyIdToken = (idToken: string) =>
	Promise.all([
		decodeProtectedHeader(idToken),
		fetchJson<Record<string, string>>(
			'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
		)
	])
		.then(([header, metadata]) => metadata[header.kid!])
		.then((certificate) => importX509(certificate, 'RS256'))
		.then((key) => jwtVerify(idToken, key))
		.then((result) => result.payload as unknown)
		.then((u) => u as UserInfo);
