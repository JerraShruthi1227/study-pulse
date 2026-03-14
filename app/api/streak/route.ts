let data = {
  streak: 0,
  totalDays: 0,
  lastDate: "",
  history: [] as string[]
};

export async function GET() {
  return Response.json(data);
}

export async function POST(req: Request) {

  const body = await req.json();
  const today = body.date;

  if (today === data.lastDate) {
    return Response.json({ message: "Already marked today" });
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let newStreak = 1;

  if (data.lastDate === yesterday.toDateString()) {
    newStreak = data.streak + 1;
  }

  data.streak = newStreak;
  data.totalDays += 1;
  data.lastDate = today;
  data.history.push(today);

  return Response.json({
    message: "Study marked",
    data
  });
}

export async function DELETE() {
  data = {
    streak: 0,
    totalDays: 0,
    lastDate: "",
    history: []
  };

  return Response.json({ message: "Reset done" });
}