import { IEmail } from '../models/Email';

export const dummyAccounts = [
	{
		email: 'demo@acme.com',
		provider: 'IMAP',
		host: 'imap.example.com',
		port: 993,
		tls: true,
		isConnected: true
	},
	{
		email: 'sales@acme.com',
		provider: 'IMAP',
		host: 'imap.example.com',
		port: 993,
		tls: true,
		isConnected: false
	},
	{
		email: 'ops@northwind.io',
		provider: 'IMAP',
		host: 'imap.example.com',
		port: 993,
		tls: true,
		isConnected: true
	}
];

function generateDummyEmails(): Partial<IEmail & { _id: string }>[] {
	const emails: Partial<IEmail & { _id: string }>[] = [];
	const now = Date.now();
	let idCounter = 1;

	const categories: (IEmail['category'] | undefined)[] = [
		'Interested',
		'Meeting Booked',
		'Not Interested',
		'Spam',
		'Out of Office',
		undefined
	];

	const templates = [
		{
			from: 'founder@pixelcrate.io',
			subject: 'Loved your product teardown on YouTube',
			body: 'Hey there – I watched your teardown of PixelCrate last night. We just shipped a new analytics view and I would love your honest thoughts. Up for a 15‑minute screen share this week?',
			category: 'Interested' as IEmail['category']
		},
		{
			from: 'no-reply@zoom.us',
			subject: 'Meeting confirmed: Workflow automation demo',
			body: 'Your meeting “Workflow automation demo” is confirmed for Thursday at 3:00 PM. A calendar invite has been attached with the Zoom link and agenda.',
			category: 'Meeting Booked' as IEmail['category']
		},
		{
			from: 'talent@skylineventures.com',
			subject: 'Quick chat about a Staff Engineer role',
			body: 'We’re hiring a Staff Engineer for one of our portfolio companies and your background in B2B SaaS really stood out. Would you be open to an introductory call sometime this week?',
			category: 'Interested' as IEmail['category']
		},
		{
			from: 'notifications@figshare.app',
			subject: 'Weekly report: 12 new teams activated',
			body: 'Your workspace had 12 new teams created and 37 projects shared in the last 7 days. Open the analytics dashboard to see where the growth is coming from.',
			category: undefined
		},
		{
			from: 'accounts@loopbilling.io',
			subject: 'Payment failed – action required on your Loop subscription',
			body: 'We were unable to process your latest payment. Please update your billing details in the customer portal within 5 days to avoid any disruption of service.',
			category: undefined
		},
		{
			from: 'chris@flowops.co',
			subject: 'Re: Let’s pause this until Q3',
			body: 'Thanks again for the walkthrough. The team likes the direction, but we agreed to revisit tooling after our current migration finishes in July. Let’s circle back in Q3.',
			category: 'Not Interested' as IEmail['category']
		},
		{
			from: 'auto-reply@nomadtravel.com',
			subject: 'Out of office: Back on 2nd December',
			body: 'I’m currently traveling with limited access to email and will be back on 2nd December. For anything urgent, please reach out to our team alias in the signature below.',
			category: 'Out of Office' as IEmail['category']
		},
		{
			from: 'marketing@growthblitz.co',
			subject: '🚀 Get 10,000 “real” leads by Friday',
			body: 'Tired of cold outreach that goes nowhere? Our data engine guarantees 10,000 “real” leads by Friday. Click here to unlock this one‑time offer before it expires tonight.',
			category: 'Spam' as IEmail['category']
		}
	];

	const accounts = ['demo@acme.com', 'sales@acme.com', 'ops@northwind.io'];

	for (let dayOffset = 0; dayOffset < 28; dayOffset++) {
		for (let i = 0; i < 3; i++) {
			const account = accounts[i % accounts.length];
			const tmpl = templates[(dayOffset + i) % templates.length];
			const ts = now - dayOffset * 24 * 60 * 60 * 1000 - i * 90 * 60 * 1000;
			const category = tmpl.category ?? categories[(dayOffset + i) % categories.length];

			emails.push({
				_id: String(idCounter),
				messageId: `dummy-${idCounter}`,
				account,
				folder: 'INBOX',
				from: tmpl.from,
				to: [account],
				subject: tmpl.subject,
				body: tmpl.body,
				html: i % 2 === 0 ? `<p>${tmpl.body}</p>` : '',
				date: new Date(ts),
				category,
				isRead: (dayOffset + i) % 3 === 0,
				isFlagged: (dayOffset + i) % 7 === 0,
				attachments: (dayOffset + i) % 5 === 0 ? [{ filename: 'invoice.pdf', size: 120 * 1024 }] : []
			});
			idCounter++;
		}
	}

	return emails;
}

export const dummyEmails: Partial<IEmail & { _id: string }>[] = generateDummyEmails();


