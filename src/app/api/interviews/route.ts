import { connectDB } from '@/utils/db';
import InterviewResult from '@/model/InterviewResult';

export async function GET() {
  try {
    await connectDB();

    const results = await InterviewResult.find().sort({ createdAt: -1 });

    return Response.json({ success: true, interviews: results });
  } catch (error) {
    console.error('❌ Error fetching interviews:', error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
