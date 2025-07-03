import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'interview_results.json');

async function ensureDataDirectory() {
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { role, question, answer, isCorrect } = await req.json();

    if (!role || !question || !answer) {
      return NextResponse.json({ message: 'Role, question, and answer are required' }, { status: 400 });
    }

    await ensureDataDirectory();

    let results = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      results = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist yet, start with an empty array
    }

    const newResult = {
      id: results.length + 1,
      role,
      question,
      answer,
      isCorrect,
      timestamp: new Date().toISOString(),
    };
    results.push(newResult);

    await fs.writeFile(filePath, JSON.stringify(results, null, 2));

    return NextResponse.json({ success: true, result: newResult }, { status: 200 });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ message: 'Failed to save result' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const results = JSON.parse(fileData);
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}