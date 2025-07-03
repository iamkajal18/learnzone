'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function QuizForm() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        quizName: '',
        totalQuestions: '',
        totalMarks: '',
    });
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!formData.quizName || !formData.totalQuestions || !formData.totalMarks) {
            setError('All fields are required.');
            return;
        }

        try {
            const res = await fetch('/api/quizzes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Quiz created successfully!');
                setFormData({ quizName: '', totalQuestions: '', totalMarks: '' });
            } else {
                setError(data.message || 'Failed to create quiz.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    if (status === 'loading') {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (!session) {
        return (
            <div className="text-center">
                <p className="text-red-500 mb-4">Please log in to create a quiz.</p>
                <button
                    onClick={() => signIn()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Log In
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Quiz</h2>
                <button
                    onClick={() => signOut({ callbackUrl: '/quiz' })}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Log Out
                </button>
            </div>
            <p className="text-gray-600 mb-4">Logged in as: {session?.user?.email}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="quizName" className="block text-sm font-medium text-gray-700">
                        Quiz Name
                    </label>
                    <input
                        type="text"
                        id="quizName"
                        name="quizName"
                        value={formData.quizName}
                        onChange={handleChange}
                        placeholder="Enter quiz name"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="totalQuestions" className="block text-sm font-medium text-gray-700">
                        Total Questions
                    </label>
                    <input
                        type="number"
                        id="totalQuestions"
                        name="totalQuestions"
                        value={formData.totalQuestions}
                        onChange={handleChange}
                        placeholder="Enter number of questions"
                        min="1"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700">
                        Total Marks
                    </label>
                    <input
                        type="number"
                        id="totalMarks"
                        name="totalMarks"
                        value={formData.totalMarks}
                        onChange={handleChange}
                        placeholder="Enter total marks"
                        min="1"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
}