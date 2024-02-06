import { error, json } from '@sveltejs/kit';
import { writeData } from '../../../../lib/data/writeData';

const usersWhoCanUpload: string[] = [
	'757210db-4ca6-404b-ae58-4681246ae6fc',
	'fd198f8f-b4fd-4595-a0cb-cd4bc2c1088a'
];

export async function POST({ request, locals: { supabase, getSession } }) {
	const session = await getSession();
	if (session === null) {
		throw error(401, { message: 'You must be logged in to upload a match' });
	}
	if (!usersWhoCanUpload.includes(session.user.id)) {
		throw error(403, { message: 'You are not authorized to upload a match' });
	}

	const match = await request.json();

	const writtenData = await writeData(match);

	return json(writtenData);
}
