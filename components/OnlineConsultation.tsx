import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, ArrowLeft, Send, Bot, UserCircle, Paperclip, X, FileText, Image as ImageIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

interface OnlineConsultationProps {
  onBack: () => void;
  onLogout: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

const suggestedQuestions = [
  {
    id: 1,
    question: "Da tôi bị ngứa và nổi mẩn, nguyên nhân là gì?",
    answer: "Ngứa và nổi mẩn là tình trạng da thường gặp, có thể do dị ứng, viêm da, thời tiết nóng ẩm, nhiễm nấm hoặc tiếp xúc với mỹ phẩm, hóa chất.\n\nBạn nên tránh gãi, giữ da sạch và khô, sử dụng kem dưỡng ẩm dịu nhẹ để làm dịu da. Nếu tình trạng kéo dài hoặc lan rộng, nên tham khảo ý kiến bác sĩ da liễu."
  },
  {
    id: 2,
    question: "Da bị đỏ, rát hoặc bong tróc có nguy hiểm không?",
    answer: "Phần lớn các trường hợp đỏ, rát hoặc bong tróc da không nguy hiểm, thường liên quan đến kích ứng da, da khô, cháy nắng hoặc viêm da nhẹ.\n\nBạn nên ngừng sử dụng các sản phẩm nghi gây kích ứng, dưỡng ẩm thường xuyên và tránh nắng. Nếu da đau nhiều, chảy dịch hoặc không cải thiện sau vài ngày, bạn nên đi khám."
  },
  {
    id: 3,
    question: "Tôi bị viêm da dị ứng thì nên xử lý thế nào?",
    answer: "Viêm da dị ứng xảy ra khi da phản ứng với mỹ phẩm, hóa chất, kim loại hoặc môi trường. Biểu hiện thường là ngứa, đỏ và khó chịu.\n\nCách xử lý quan trọng nhất là tránh tiếp xúc với tác nhân gây dị ứng, vệ sinh da nhẹ nhàng và duy trì dưỡng ẩm. Trường hợp nặng cần điều trị theo chỉ định của bác sĩ."
  },
  {
    id: 4,
    question: "Tôi bị nấm da thì điều trị ra sao?",
    answer: "Nấm da là bệnh da liễu khá phổ biến và dễ tái phát nếu điều trị không đúng cách. Bệnh thường xuất hiện ở vùng da ẩm, nhiều mồ hôi.\n\nViệc điều trị cần giữ vùng da khô thoáng, không dùng chung đồ cá nhân và sử dụng thuốc kháng nấm theo hướng dẫn y tế, dùng đủ thời gian để tránh tái phát."
  },
  {
    id: 5,
    question: "Tôi nên chăm sóc da tại nhà như thế nào?",
    answer: "Chăm sóc da đúng cách giúp cải thiện triệu chứng và hỗ trợ quá trình điều trị.\n\nBạn nên vệ sinh da nhẹ nhàng, sử dụng sản phẩm phù hợp với loại da, dưỡng ẩm hằng ngày, tránh gãi và hạn chế tiếp xúc ánh nắng mạnh. Duy trì lối sống lành mạnh cũng giúp da hồi phục tốt hơn."
  },
  {
    id: 6,
    question: "Khi nào tôi cần gặp bác sĩ da liễu?",
    answer: "Bạn nên gặp bác sĩ da liễu khi tình trạng da không cải thiện sau khi chăm sóc tại nhà, có dấu hiệu nặng dần, lan rộng hoặc xuất hiện đau, mưng mủ, sốt.\n\nViệc tư vấn bác sĩ sớm, kể cả khám trực tuyến, giúp chẩn đoán chính xác và điều trị kịp thời."
  }
];

export function OnlineConsultation({ onBack, onLogout }: OnlineConsultationProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedQuestion = (question: string, answer: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && attachments.length === 0) return;

    // Check if there are image attachments
    const hasImages = attachments.some(att => att.type.startsWith('image/'));

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachments
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      let aiResponse = '';
      
      if (hasImages) {
        // AI analyzes the image and provides diagnosis
        const diagnoses = [
          {
            title: "Viêm da dị ứng",
            content: "Dựa trên hình ảnh được cung cấp, vùng da có biểu hiện đỏ, nổi mẩn và kích ứng, phù hợp với đặc điểm thường gặp của viêm da dị ứng. Các tổn thương có thể xuất hiện rải rác, kèm theo khô hoặc bong tróc nhẹ.\n\nTình trạng này thường liên quan đến tiếp xúc mỹ phẩm, hóa chất hoặc yếu tố môi trường. Người dùng nên tránh gãi, hạn chế tiếp xúc tác nhân nghi ngờ và theo dõi diễn tiến da. Để xác định chính xác và điều trị phù hợp, nên tham khảo ý kiến bác sĩ da liễu."
          },
          {
            title: "Mề đay",
            content: "Hình ảnh cho thấy các mảng da nổi cao, màu hồng hoặc đỏ nhạt, ranh giới khá rõ, đây là đặc điểm thường gặp trong mề đay. Các tổn thương có thể thay đổi vị trí theo thời gian.\n\nMề đay thường liên quan đến phản ứng dị ứng hoặc yếu tố miễn dịch. Người dùng nên tránh gãi mạnh và theo dõi thêm các triệu chứng đi kèm. Nếu tình trạng tái phát nhiều lần hoặc diễn tiến nặng, nên đi khám chuyên khoa."
          },
          {
            title: "Mụn trứng cá",
            content: "Qua hình ảnh, có thể nhận thấy nhiều nốt mụn xuất hiện tại lỗ chân lông, bao gồm cả mụn viêm và mụn không viêm. Đây là đặc điểm thường gặp của mụn trứng cá.\n\nTình trạng này thường liên quan đến tăng tiết bã nhờn và bít tắc lỗ chân lông. Việc vệ sinh da đúng cách, tránh nặn mụn và chăm sóc da phù hợp giúp hạn chế viêm và sẹo."
          },
          {
            title: "Mụn đầu đen, mụn đầu trắng",
            content: "Hình ảnh cho thấy các nhân mụn nhỏ màu sẫm hoặc trắng, thường tập trung ở vùng mũi, trán và cằm. Đây là dấu hiệu phổ biến của mụn đầu đen và mụn đầu trắng.\n\nĐây là dạng mụn không viêm, có thể cải thiện bằng cách làm sạch da đều đặn và chăm sóc da phù hợp. Tránh tự ý nặn mụn để hạn chế viêm và thâm sau mụn."
          },
          {
            title: "Tàn nhang",
            content: "Dựa trên hình ảnh, da xuất hiện các đốm nâu nhỏ, phân bố khá đều, thường thấy ở những vùng da tiếp xúc nhiều với ánh nắng. Đây là đặc điểm điển hình của tàn nhang.\n\nTàn nhang thường liên quan đến yếu tố di truyền và tác động của ánh nắng mặt trời. Việc bảo vệ da, đặc biệt là chống nắng, giúp hạn chế tình trạng đậm màu hơn."
          },
          {
            title: "Thâm da, tăng sắc tố",
            content: "Hình ảnh cho thấy vùng da sẫm màu hơn so với xung quanh, có thể xuất hiện sau viêm da hoặc mụn. Đây là biểu hiện thường gặp của thâm da hoặc tăng sắc tố.\n\nTình trạng này thường cần thời gian để cải thiện. Chăm sóc da đúng cách, dưỡng ẩm và chống nắng có thể hỗ trợ quá trình phục hồi. Nếu thâm kéo dài hoặc lan rộng, nên tham khảo ý kiến bác sĩ da liễu."
          }
        ];
        
        // Check if user message contains a number (1-6)
        const numberMatch = userMessage.content.match(/[1-6]/);
        let selectedDiagnosis;
        
        if (numberMatch) {
          const diagnosisIndex = parseInt(numberMatch[0]) - 1;
          selectedDiagnosis = diagnoses[diagnosisIndex];
        } else {
          // Randomly select a diagnosis if no number specified
          selectedDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
        }
        
        aiResponse = `📋 Phân tích hình ảnh da\n\n**${selectedDiagnosis.title}**\n\n${selectedDiagnosis.content}`;
      } else {
        aiResponse = "Cảm ơn bạn đã đặt câu hỏi! Đây là câu hỏi tự do không nằm trong danh sách gợi ý của tôi. Để được tư vấn chính xác nhất, bạn có thể chọn một trong các câu hỏi gợi ý bên dưới hoặc đặt lịch khám với bác sĩ da liễu chuyên khoa của chúng tôi.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: Attachment[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const attachment: Attachment = {
          id: Date.now().toString() + i,
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file)
        };
        newAttachments.push(attachment);
      }
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                {/* Tiktok */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span>Tiktok</span>
                </a>
                <span className="text-gray-400">|</span>
                
                {/* Facebook */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <Facebook size={14} />
                  <span>Facebook</span>
                </a>
                <span className="text-gray-400">|</span>
                
                {/* Zalo */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.735c-.15.428-.794.794-1.294.868-.5.074-1.146.074-1.867-.057-1.064-.188-2.39-.562-3.77-1.42-2.637-1.644-4.352-4.567-4.483-7.578-.037-.874.318-1.608.886-1.945.568-.337 1.325-.337 1.893.169.568.506 1.42 1.945 1.42 2.526 0 .581-.225 1.162-.787 1.668-.562.506-.75.9-.562 1.418.3.825 1.275 2.076 2.32 2.857.862.644 1.78 1.063 2.507 1.232.518.12.975-.075 1.38-.637.406-.562.844-1.344 1.425-1.344.581 0 1.8.844 2.451 1.238.651.394.862.656.712 1.084z"/>
                  </svg>
                  <span>Zalo</span>
                </a>
                <span className="text-gray-400">|</span>
                
                {/* Youtube */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Youtube</span>
                </a>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-1.5 bg-orange-400 hover:bg-orange-500 text-white rounded-full text-sm transition-colors flex items-center gap-1.5">
                  <Download size={14} />
                  <span>Tải ứng dụng</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition-colors flex items-center gap-1.5"
                >
                  <User size={14} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="YTeXanh" className="h-12 w-auto" style={{ mixBlendMode: 'multiply' }} />
              <span className="text-2xl font-bold text-cyan-500">YTeXanh</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-700 hover:text-cyan-600 transition-colors">Trang chủ</a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Dịch vụ y tế <ChevronDown size={16} />
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Tin tức
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Liên hệ hợp tác <ChevronDown size={16} />
              </a>
            </nav>
            <button className="md:hidden">
              <Menu className="text-gray-700" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Quay lại</span>
          </button>

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tư Vấn Trực Tuyến</h1>
            <p className="text-gray-600">Trò chuyện với AI để nhận tư vấn sức khỏe da liễu</p>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Bot className="text-cyan-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">Trợ lý AI - Tư vấn Da liễu</h3>
                <p className="text-cyan-100 text-sm">Sẵn sàng giải đáp thắc mắc của bạn</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400"
            >
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-cyan-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-200">
                      <p className="text-gray-800">
                        Xin chào! Tôi là trợ lý AI của YTeXanh, chuyên tư vấn về các vấn đề da liễu. 
                        Bạn có thể chọn một trong các câu hỏi gợi ý bên dưới hoặc gõ câu hỏi của riêng bạn.
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 ml-2 mt-1 inline-block">
                      {formatTime(new Date())}
                    </span>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-cyan-600' : 'bg-cyan-100'
                  }`}>
                    {message.type === 'user' ? (
                      <UserCircle className="text-white" size={20} />
                    ) : (
                      <Bot className="text-cyan-600" size={20} />
                    )}
                  </div>
                  <div className={`flex-1 ${message.type === 'user' ? 'flex flex-col items-end' : ''}`}>
                    <div className={`rounded-2xl p-4 shadow-sm max-w-[85%] ${
                      message.type === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}>
                      <p className={`whitespace-pre-wrap ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                        {message.content}
                      </p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment) => {
                            const isImage = attachment.type.startsWith('image/');
                            return (
                              <div key={attachment.id}>
                                {isImage ? (
                                  <img
                                    src={attachment.url}
                                    alt={attachment.name}
                                    className="max-w-xs rounded-lg border-2 border-white/20"
                                  />
                                ) : (
                                  <div className={`flex items-center gap-2 p-2 rounded-lg ${
                                    message.type === 'user' ? 'bg-cyan-700' : 'bg-gray-100'
                                  }`}>
                                    <FileText size={20} className={message.type === 'user' ? 'text-white' : 'text-gray-600'} />
                                    <span className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                                      {attachment.name}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <span className={`text-xs text-gray-500 mt-1 inline-block ${message.type === 'user' ? 'mr-2' : 'ml-2'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-cyan-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-200 inline-block">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="border-t border-gray-200 bg-white p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Câu hỏi gợi ý:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSuggestedQuestion(item.question, item.answer)}
                    className="text-left p-3 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map((attachment) => {
                    const isImage = attachment.type.startsWith('image/');
                    const formatFileSize = (bytes: number) => {
                      if (bytes < 1024) return bytes + ' B';
                      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
                      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
                    };

                    return (
                      <div
                        key={attachment.id}
                        className="relative bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center gap-2 group"
                      >
                        {isImage ? (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <FileText className="text-gray-600" size={24} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveAttachment(attachment.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors h-[52px] flex items-center justify-center"
                  title="Đính kèm file"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && attachments.length === 0}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center gap-2 h-[52px]"
                >
                  <Send size={20} />
                  <span>Gửi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="YTeXanh" className="h-10 w-auto" />
                <span className="text-xl font-bold text-cyan-400">YTeXanh</span>
              </div>
              <p className="text-sm mb-4">
                Nền tảng y tế thông minh hàng đầu Việt Nam, kết nối bệnh nhân với các cơ sở y tế uy tín.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                  <Mail size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-bold text-white mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Dịch vụ y tế</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Đặt lịch khám</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tin tức sức khỏe</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Hợp tác doanh nghiệp</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-white mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Khám từ xa (Telemedicine)</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Đặt lịch khám bệnh</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Xét nghiệm tại nhà</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tư vấn sức khỏe</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Gói khám sức khỏe</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white mb-4">Liên hệ</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <span>266 Hoàng Diệu, Phường Nam Dương, Quận Hải Châu, TP Đà Nẵng.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={18} className="text-cyan-400" />
                  <span>Hotline: 1900 2267</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={18} className="text-cyan-400" />
                  <span>support@ytexanh.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={18} className="text-cyan-400" />
                  <span>24/7 - Cả tuần</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <p>© 2026 YTeXanh. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-cyan-400 transition-colors">Điều khoản sử dụng</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">Chính sách bảo mật</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">Hỗ trợ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}