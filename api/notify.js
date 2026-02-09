export default async function handler(req, res) {
    // Nur POST-Anfragen erlauben
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { memo, usd, ton, plan } = req.body;
    
    // Deine Webhook URL
    const webhook = "https://discord.com/api/webhooks/1470484640761643245/70IuWbxi-64FWZq2MEHCqQ9idquIcB8VbB9GTDE3pmM-2RHrTbtnW9Outh51oalwkcaA";

    const discordPayload = {
        username: "QJ Payment Bot",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/6001/6001343.png",
        embeds: [{
            title: "💎 New Deposit Reported",
            description: "Ein User hat eine Zahlung über das Dashboard gemeldet.",
            color: 3447003, // Edles Blau
            fields: [
                { 
                    name: "📋 Memo / Transaction ID", 
                    value: `\`${memo}\``, 
                    inline: false 
                },
                { 
                    name: "💰 Amount Requested", 
                    value: `**$${usd}**`, 
                    inline: true 
                },
                { 
                    name: "💎 TON Equivalent", 
                    value: `\`${ton} TON\``, 
                    inline: true 
                },
                { 
                    name: "🔗 Blockchain Explorer", 
                    value: `[Check Wallet](https://tonscan.org/address/UQBtQ3-1Z9HPMXHGeOgdisjdAH5NEh1nV_V_WSWRJCr7rxD-)`, 
                    inline: false 
                }
            ],
            footer: { 
                text: "QJ Joiner Console • Manual Verification Required" 
            },
            timestamp: new Date()
        }]
    };

    try {
        const response = await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Failed to notify Discord' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
