
import { NextApiRequest, NextApiResponse } from 'next';

interface Doctor {
  name: string;
  expertise: string;
  city: string;
}

const doctors: Doctor[] = [
  { name: "Dr. John Doe", expertise: "Physiotherapy", city: "New York" },
  { name: "Dr. Jane Smith", expertise: "Chiropractic", city: "New York" },
  { name: "Dr. Alice Johnson", expertise: "Physical Therapy", city: "Los Angeles" },
  { name: "Dr. Bob Brown", expertise: "Orthopedics", city: "Chicago" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { city } = req.query;

    const filteredDoctors = city
      ? doctors.filter((doc) => doc.city.toLowerCase() === (city as string).toLowerCase())
      : doctors;

    res.status(200).json(filteredDoctors);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
