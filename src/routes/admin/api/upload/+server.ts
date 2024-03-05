import { error, json } from '@sveltejs/kit';
import { writeData } from '../../../../lib/data/writeData';

const usersWhoCanUpload: string[] = [
	'757210db-4ca6-404b-ae58-4681246ae6fc', // Josh
	'fd198f8f-b4fd-4595-a0cb-cd4bc2c1088a', // Mark
	'7e656f77-e4c0-44f1-92b3-210c93195675', // Blake
	'437f5379-650b-4f25-9ed4-1f0e4b1d83b6', // Rylee
	'43f02320-89ed-4f3f-abf4-340566ae8697', // AJ
	'9af0ddf3-2cd7-4d55-b46b-57f501fbeedf' // Lydia
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
