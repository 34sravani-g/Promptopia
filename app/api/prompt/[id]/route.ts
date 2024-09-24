import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { NextRequest, NextResponse } from 'next/server';

type Params = { params: { id: string } };

// GET (read)
export const GET = async (request: NextRequest, { params }: Params) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new NextResponse('Prompt not found', { status: 400 });

    return new NextResponse(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to fetch prompt', { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request: NextRequest, { params }: Params) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new NextResponse('Prompt not found', { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new NextResponse(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to update prompt', { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request: NextRequest, { params }: Params) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new NextResponse('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to delete prompt', { status: 500 });
  }
};
