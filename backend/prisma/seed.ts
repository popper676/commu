import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.readReceipt.deleteMany();
    await prisma.directMessage.deleteMany();
    await prisma.directConversation.deleteMany();
    await prisma.challengeSubmission.deleteMany();
    await prisma.challenge.deleteMany();
    await prisma.share.deleteMany();
    await prisma.reaction.deleteMany();
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.file.deleteMany();
    await prisma.post.deleteMany();
    await prisma.message.deleteMany();
    await prisma.channel.deleteMany();
    await prisma.communityMember.deleteMany();
    await prisma.community.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.creatorRequest.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Cleared existing data');

    // Create users
    console.log('👥 Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user1 = await prisma.user.create({
        data: {
            email: 'kyaw@example.com',
            username: 'kyawkyaw',
            password: hashedPassword,
            fullName: 'Kyaw Kyaw',
            fullNameMm: 'ကျော်ကျော်',
            bio: 'Tech enthusiast from Yangon',
            bioMm: 'ရန်ကုန်က နည်းပညာ ချစ်သူ',
            avatar: 'https://i.pravatar.cc/150?img=1',
            verified: true,
            isCreator: true,
            creatorVerified: true,
            creatorBio: 'Creating educational content about programming',
            creatorBioMm: 'ပရိုဂရမ်းမင်းအကြောင်း ပညာရေး အကြောင်းအရာများ ဖန်တီးနေသူ',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'su@example.com',
            username: 'susu',
            password: hashedPassword,
            fullName: 'Su Su',
            fullNameMm: 'စုစု',
            bio: 'Designer and artist',
            bioMm: 'ဒီဇိုင်နာနဲ့ အနုပညာရှင်',
            avatar: 'https://i.pravatar.cc/150?img=2',
            verified: true,
            isCreator: true,
            creatorVerified: true,
            creatorBio: 'Teaching design and creativity',
            creatorBioMm: 'ဒီဇိုင်းနဲ့ တီထွင်မှု သင်ကြားပေးနေသူ',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            email: 'aung@example.com',
            username: 'aungaung',
            password: hashedPassword,
            fullName: 'Aung Aung',
            fullNameMm: 'အောင်အောင်',
            bio: 'Student and tech learner',
            bioMm: 'ကျောင်းသားနဲ့ နည်းပညာသင်ယူသူ',
            avatar: 'https://i.pravatar.cc/150?img=3',
            verified: false,
        },
    });

    const user4 = await prisma.user.create({
        data: {
            email: 'mya@example.com',
            username: 'myamya',
            password: hashedPassword,
            fullName: 'Mya Mya',
            fullNameMm: 'မြမြ',
            bio: 'Content creator and photographer',
            bioMm: 'အကြောင်းအရာဖန်တီးသူနဲ့ ဓာတ်ပုံဆရာ',
            avatar: 'https://i.pravatar.cc/150?img=4',
            verified: true,
        },
    });

    console.log('✅ Created 4 users');

    // Create follows
    await prisma.follow.createMany({
        data: [
            { followerId: user3.id, followingId: user1.id },
            { followerId: user3.id, followingId: user2.id },
            { followerId: user4.id, followingId: user1.id },
            { followerId: user4.id, followingId: user2.id },
            { followerId: user1.id, followingId: user2.id },
        ],
    });

    console.log('✅ Created follows');

    // Create communities
    console.log('🏘️  Creating communities...');
    const community1 = await prisma.community.create({
        data: {
            name: 'Myanmar Developers',
            nameMm: 'မြန်မာ Developers များ',
            description: 'A community for Myanmar developers to share knowledge and collaborate',
            descriptionMm: 'မြန်မာ developer များ အတွက် အသိပညာ မျှဝေနိုင်သော အသိုင်းအဝိုင်း',
            creatorId: user1.id,
            avatar: 'https://picsum.photos/seed/dev/300',
            category: 'Technology',
            isPaid: false,
            members: {
                create: [
                    {
                        userId: user1.id,
                        role: 'OWNER',
                        canSendMessages: true,
                        canSendMedia: true,
                        canSendStickers: true,
                        canSendPolls: true,
                        canAddMembers: true,
                        canPinMessages: true,
                        canChangeInfo: true,
                        canDeleteMessages: true,
                        canBanUsers: true,
                        canManageChannels: true,
                    },
                    {
                        userId: user3.id,
                        role: 'MEMBER',
                        canSendMessages: true,
                        canSendMedia: true,
                        canSendStickers: true,
                        canSendPolls: true,
                    },
                    {
                        userId: user4.id,
                        role: 'MEMBER',
                        canSendMessages: true,
                        canSendMedia: true,
                        canSendStickers: true,
                        canSendPolls: true,
                    },
                ],
            },
        },
    });

    const community2 = await prisma.community.create({
        data: {
            name: 'Design Myanmar',
            nameMm: 'မြန်မာ ဒီဇိုင်း',
            description: 'Share and learn design skills together',
            descriptionMm: 'ဒီဇိုင်း အရည်အချင်းများကို အတူတကွ မျှဝေပြီး သင်ယူကြမယ်',
            creatorId: user2.id,
            avatar: 'https://picsum.photos/seed/design/300',
            category: 'Design',
            isPaid: false,
            members: {
                create: [
                    {
                        userId: user2.id,
                        role: 'OWNER',
                        canSendMessages: true,
                        canSendMedia: true,
                        canSendStickers: true,
                        canSendPolls: true,
                        canAddMembers: true,
                        canPinMessages: true,
                        canChangeInfo: true,
                        canDeleteMessages: true,
                        canBanUsers: true,
                        canManageChannels: true,
                    },
                    {
                        userId: user3.id,
                        role: 'MEMBER',
                        canSendMessages: true,
                        canSendMedia: true,
                        canSendStickers: true,
                        canSendPolls: true,
                    },
                ],
            },
        },
    });

    console.log('✅ Created 2 communities');

    // Create channels
    console.log('📺 Creating channels...');
    const channel1 = await prisma.channel.create({
        data: {
            name: 'General',
            nameMm: 'အထွေထွေ',
            type: 'TEXT',
            communityId: community1.id,
        },
    });

    const channel2 = await prisma.channel.create({
        data: {
            name: 'Announcements',
            nameMm: 'ကြေညာချက်များ',
            type: 'TEXT',
            communityId: community1.id,
        },
    });

    console.log('✅ Created channels');

    // Create posts
    console.log('📝 Creating posts...');
    const post1 = await prisma.post.create({
        data: {
            userId: user1.id,
            content: 'Welcome to Myanmar Developers! Let\'s build amazing things together 🚀',
            contentMm: 'မြန်မာ Developers များသို့ ကြိုဆိုပါတယ်! အံ့သြဖွယ် အရာများကို အတူတကွ တည်ဆောက်ကြစို့ 🚀',
            type: 'REGULAR',
            visibility: 'PUBLIC',
        },
    });

    const post2 = await prisma.post.create({
        data: {
            userId: user2.id,
            content: 'Just finished a new design project! What do you think?',
            contentMm: 'ဒီဇိုင်းပရောဂျက် အသစ်တစ်ခု ပြီးမြောက်ခဲ့ပြီ! ဘယ်လိုထင်လဲ?',
            type: 'REGULAR',
            visibility: 'PUBLIC',
        },
    });

    const post3 = await prisma.post.create({
        data: {
            userId: user1.id,
            content: 'Check out our Myanmar Developers community!',
            contentMm: 'ကျွန်တော်တို့ရဲ့ Myanmar Developers အသိုင်းအဝိုင်းကို လာရောက်ကြည့်ပါ!',
            type: 'PROMOTION',
            visibility: 'PUBLIC',
            promotedCommunityId: community1.id,
        },
    });

    console.log('✅ Created posts');

    // Create likes and comments
    await prisma.like.createMany({
        data: [
            { userId: user3.id, postId: post1.id, type: 'POST' },
            { userId: user4.id, postId: post1.id, type: 'POST' },
            { userId: user3.id, postId: post2.id, type: 'POST' },
        ],
    });

    await prisma.comment.create({
        data: {
            userId: user3.id,
            postId: post1.id,
            content: 'Excited to be here!',
        },
    });

    await prisma.comment.create({
        data: {
            userId: user4.id,
            postId: post2.id,
            content: 'Looks amazing! Great work!',
        },
    });

    console.log('✅ Created likes and comments');

    // Create challenges
    console.log('🏆 Creating challenges...');
    const challenge1 = await prisma.challenge.create({
        data: {
            title: '30 Days of Code',
            titleMm: '၃၀ ရက် Code စိန်ခေါ်မှု',
            description: 'Code every day for 30 days and share your progress!',
            descriptionMm: '၃၀ ရက်တိုင်တိုင် code ရေးပြီး သင့်တိုးတက်မှုကို မျှဝေပါ!',
            creatorId: user1.id,
            thumbnail: 'https://picsum.photos/seed/code/400/300',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            prize: '$100 cash prize',
            prizeMm: '$100 ငွေဆု',
            category: 'Programming',
            categoryMm: 'ပရိုဂရမ်းမင်း',
            status: 'ACTIVE',
        },
    });

    const challenge2 = await prisma.challenge.create({
        data: {
            title: 'Design Challenge: Logo Redesign',
            titleMm: 'ဒီဇိုင်း စိန်ခေါ်မှု: Logo ပြန်လည်ဒီဇိုင်းရေးဆွဲခြင်း',
            description: 'Redesign a famous Myanmar brand logo with your creative touch!',
            descriptionMm: 'မြန်မာ အမှတ်တံဆိပ်ကျော်တစ်ခုကို သင့်ရဲ့ ဖန်တီးမှုနဲ့ ပြန်ဒီဇိုင်းလုပ်ပါ!',
            creatorId: user2.id,
            thumbnail: 'https://picsum.photos/seed/design/400/300',
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
            prize: 'Featured on our social media',
            prizeMm: 'ကျွန်တော်တို့ရဲ့ social media မှာ ဖော်ပြပေးမယ်',
            category: 'Design',
            categoryMm: 'ဒီဇိုင်း',
            status: 'ACTIVE',
        },
    });

    console.log('✅ Created challenges');

    // Create challenge submissions
    await prisma.challengeSubmission.create({
        data: {
            challengeId: challenge1.id,
            userId: user3.id,
            content: 'Day 1: Built a simple calculator app!',
            contentMm: 'ပထမနေ့: ရိုးရှင်းတဲ့ calculator app တစ်ခု လုပ်ဆောင်ခဲ့ပါတယ်!',
        },
    });

    console.log('✅ Created challenge submissions');

    // Create messages in channels
    await prisma.message.createMany({
        data: [
            {
                channelId: channel1.id,
                userId: user1.id,
                content: 'Welcome everyone to the general channel!',
            },
            {
                channelId: channel1.id,
                userId: user3.id,
                content: 'Thanks for creating this community!',
            },
        ],
    });

    console.log('✅ Created messages');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  👥 Users: 4');
    console.log('  🏘️  Communities: 2');
    console.log('  📺 Channels: 2');
    console.log('  📝 Posts: 3');
    console.log('  💬 Comments: 2');
    console.log('  👍 Likes: 3');
    console.log('  🏆 Challenges: 2');
    console.log('  📤 Submissions: 1');
    console.log('  💌 Messages: 2');
    console.log('  👥 Follows: 5');
    console.log('\n🔐 Test Login:');
    console.log('  Email: kyaw@example.com');
    console.log('  Password: password123');
    console.log('  (Also works for: su@example.com, aung@example.com, mya@example.com)');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
