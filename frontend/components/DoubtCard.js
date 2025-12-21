import Link from 'next/link';
import Tag from './Tag';

export default function DoubtCard({ doubt }) {
    return (
        <Link href={`/doubts/${doubt.id}`}>
            <div className="p-4 border-b border-x-border hover:bg-x-hover transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                        {doubt.authorName.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-x-text">{doubt.authorName}</span>
                            <span className="text-x-text-secondary text-sm">
                                · {new Date(doubt.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-x-text mb-2">{doubt.title}</h3>

                        <p className="text-x-text-secondary mb-3 line-clamp-2">
                            {doubt.description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            {doubt.tags.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-x-text-secondary text-sm">
                            <span className="flex items-center gap-1">
                                💬 {doubt.answers} {doubt.answers === 1 ? 'answer' : 'answers'}
                            </span>
                            {doubt.status === 'answered' && (
                                <span className="text-x-success">✓ Answered</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
