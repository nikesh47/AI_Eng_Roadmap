export const PHASES = [
  {
    id:0, num:"00", title:"Setup & Environment", duration:"1 week",
    intro:"Get everything ready before writing a single line of ML code. Your free compute stack lives here.",
    resources:[
      {t:"Python 3.12+ · VS Code · Git — install all three", u:null},
      {t:"Google Colab — free T4 GPU, ~12hr sessions", u:"https://colab.research.google.com"},
      {t:"Kaggle Notebooks — free 30hrs GPU/week (often better than Colab)", u:"https://kaggle.com"},
      {t:"HuggingFace — free account + free Spaces hosting for demos", u:"https://huggingface.co"},
      {t:"Groq API — generous free tier for LLM calls", u:"https://console.groq.com"},
      {t:"Google AI Studio (Gemini) — free LLM API", u:"https://aistudio.google.com"},
      {t:"Modal.com — free compute credits on signup", u:"https://modal.com"},
    ],
    project:null,
    tip:"Free GPU priority: Kaggle for long training runs, Colab for quick experiments. Lightning AI and Modal also have free tiers."
  },
  {
    id:1, num:"01", title:"Python Fluency", duration:"4–6 weeks",
    intro:"Everything else collapses without solid Python. Don't rush this phase — it's load-bearing.",
    resources:[
      {t:"Automate the Boring Stuff with Python — full book free online", u:"https://automatetheboringstuff.com"},
      {t:"Harvard CS50P — Introduction to Programming with Python (free edX + YouTube)", u:"https://cs50.harvard.edu/python"},
      {t:"Corey Schafer Python Tutorials — YouTube", u:"https://youtube.com/@coreyms"},
      {t:"NumPy Quickstart Guide — official docs, free", u:"https://numpy.org/doc/stable/user/quickstart.html"},
      {t:"Pandas 10 Minutes to Pandas — official docs, free", u:"https://pandas.pydata.org/docs/user_guide/10min.html"},
      {t:"Real Python (free articles) — bite-sized Python deep dives", u:"https://realpython.com"},
    ],
    project:"Build a web scraper → clean data with Pandas → visualize with Matplotlib. Push to GitHub with a proper README.",
    tip:"You're ready to advance when you can teach list comprehensions, classes, and decorators to someone else from memory."
  },
  {
    id:2, num:"02", title:"Math Foundations", duration:"4–6 weeks (parallel to Phase 01 OK)",
    intro:"You need intuition, not proofs. Don't try to become a mathematician — understand the shapes.",
    resources:[
      {t:"3Blue1Brown — Essence of Linear Algebra (YouTube, full series)", u:"https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"},
      {t:"3Blue1Brown — Essence of Calculus (YouTube, full series)", u:"https://youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"},
      {t:"StatQuest with Josh Starmer — Probability & Stats (YouTube)", u:"https://youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9"},
      {t:"Khan Academy — Linear Algebra (free practice problems)", u:"https://khanacademy.org/math/linear-algebra"},
      {t:"Mathematics for Machine Learning — free PDF at mml-book.github.io", u:"https://mml-book.github.io"},
    ],
    project:"Implement gradient descent from scratch in NumPy. Visualize the loss curve converging on a toy dataset.",
    tip:"Focus on what matrix multiplication DOES geometrically. What a gradient IS physically. Don't memorize formulas — build the picture."
  },
  {
    id:3, num:"03", title:"Classical Machine Learning", duration:"6–8 weeks",
    intro:"The foundation every AI engineer assumes you already have. Do not skip or rush it.",
    resources:[
      {t:"Andrew Ng ML Specialization — audit FREE on Coursera (click 'Audit' to skip the paid cert)", u:"https://coursera.org/specializations/machine-learning-introduction"},
      {t:"StatQuest — Complete ML Playlist (YouTube, excellent)", u:"https://youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF500j4GB9R"},
      {t:"Caltech: Learning From Data — Yaser Abu-Mostafa (YouTube, free)", u:"https://youtube.com/playlist?list=PLD63A284B7615313A"},
      {t:"Kaggle Learn — free hands-on micro-courses (ML, Pandas, feature engineering)", u:"https://kaggle.com/learn"},
      {t:"scikit-learn User Guide — read it cover-to-cover like a textbook", u:"https://scikit-learn.org/stable/user_guide.html"},
      {t:"An Intro to Statistical Learning — free PDF at statlearning.com", u:"https://statlearning.com"},
    ],
    project:"1. Kaggle Titanic (full end-to-end pipeline). 2. Kaggle House Prices (reach top 50%). 3. Classifier on data YOU collect — scrape, label, train.",
    tip:"The Coursera certificate is worthless. The audit (free) gets all the content. No employer has ever cared about a Coursera certificate."
  },
  {
    id:4, num:"04", title:"Deep Learning", duration:"8–10 weeks",
    intro:"Build and train neural networks. PyTorch only — TensorFlow is fading fast in 2026.",
    resources:[
      {t:"fast.ai — Practical Deep Learning for Coders (free, top-down approach)", u:"https://course.fast.ai"},
      {t:"MIT 6.S191 — Intro to Deep Learning (free on YouTube, updated every year)", u:"https://introtodeeplearning.com"},
      {t:"Dive into Deep Learning — d2l.ai (free interactive book with PyTorch code)", u:"https://d2l.ai"},
      {t:"NYU Deep Learning — Yann LeCun & Alfredo Canziani (free YouTube)", u:"https://youtube.com/playlist?list=PLLHTzKZzVU9eaEyErdV26ikyolxOsz6mq"},
      {t:"PyTorch Official Tutorials — free", u:"https://pytorch.org/tutorials"},
      {t:"Deep Learning Book — Goodfellow, Bengio, Courville (free at deeplearningbook.org)", u:"https://deeplearningbook.org"},
    ],
    project:"1. CNN on CIFAR-10 from scratch in PyTorch. 2. Fine-tune pretrained ResNet on a custom image dataset. 3. Deploy it free on HuggingFace Spaces.",
    tip:"fast.ai is top-down (build first, understand later). MIT 6.S191 is bottom-up. Do fast.ai FIRST — shipping early keeps you motivated."
  },
  {
    id:5, num:"05", title:"Transformers & LLMs", duration:"8–10 weeks",
    intro:"The heart of modern AI. Karpathy's series is the best LLM education that exists at any price.",
    resources:[
      {t:"Karpathy — Neural Networks: Zero to Hero (ALL videos — code along, no shortcuts)", u:"https://karpathy.ai/zero-to-hero.html"},
      {t:"Karpathy — Intro to Large Language Models (1hr overview)", u:"https://youtube.com/watch?v=zjkBMFhNj_g"},
      {t:"Karpathy — Deep Dive into LLMs like ChatGPT", u:"https://youtube.com/watch?v=7xTGNNLPyMI"},
      {t:"Karpathy — Let's reproduce GPT-2 (from scratch, in code)", u:"https://youtube.com/watch?v=l8pRSuU81PU"},
      {t:"HuggingFace NLP Course — free, excellent", u:"https://huggingface.co/learn/nlp-course"},
      {t:"The Illustrated Transformer — Jay Alammar (free blog post)", u:"https://jalammar.github.io/illustrated-transformer"},
      {t:"'Attention Is All You Need' — original paper on arXiv (free)", u:"https://arxiv.org/abs/1706.03762"},
      {t:"Stanford CS224N — NLP with Deep Learning (free YouTube)", u:"https://youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVx76"},
    ],
    project:"1. Train tiny GPT on Shakespeare (with Karpathy). 2. Fine-tune Llama 3.2 1B with LoRA on Kaggle GPU. 3. Reimplement the original Transformer paper from scratch.",
    tip:"Watch Karpathy at 1x speed. Pause constantly. Code along — watching passively is almost completely useless for this material."
  },
  {
    id:6, num:"06", title:"AI Engineering in Production", duration:"10–12 weeks",
    intro:"What actually makes you hireable. Most bootcamps and courses skip this entirely. It is everything.",
    resources:[
      {t:"Anthropic Prompt Engineering Guide — free", u:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"},
      {t:"Anthropic — Building Effective Agents (essential free article)", u:"https://anthropic.com/research/building-effective-agents"},
      {t:"Hamel Husain's blog — evals (hamel.dev — the best content on this topic, free)", u:"https://hamel.dev"},
      {t:"Eugene Yan's blog — applied AI engineering (eugeneyan.com, free)", u:"https://eugeneyan.com"},
      {t:"FastAPI Documentation — free", u:"https://fastapi.tiangolo.com"},
      {t:"Qdrant Documentation — free vector database for RAG", u:"https://qdrant.tech/documentation"},
      {t:"Unsloth — free library for fast LoRA/QLoRA fine-tuning", u:"https://unsloth.ai"},
      {t:"LangChain Docs — use sparingly, build raw first", u:"https://docs.langchain.com"},
      {t:"Papers With Code — track what's shipping (free)", u:"https://paperswithcode.com"},
      {t:"OpenRouter — free tier access to many open models", u:"https://openrouter.ai"},
    ],
    project:"1. Production RAG app (own data, deployed, with real evals). 2. AI agent with tool use. 3. Fine-tune a small open model + write up the process. 4. One ambitious project you'd actually use.",
    tip:"Use Groq + Google AI Studio free tiers throughout this phase. Only move to paid APIs when you need production-level throughput."
  },
  {
    id:7, num:"07", title:"Portfolio & Job Search", duration:"Ongoing from month 6",
    intro:"You now have 8–10 real projects. The GitHub portfolio matters infinitely more than any certificate.",
    resources:[
      {t:"GitHub — 5 pinned projects, each with video demo + deployed link + clean README", u:"https://github.com"},
      {t:"Vercel — free personal portfolio site hosting", u:"https://vercel.com"},
      {t:"HuggingFace Spaces — free hosting for ML demos", u:"https://huggingface.co/spaces"},
      {t:"Chip Huyen's blog — career advice for ML (huyenchip.com, free)", u:"https://huyenchip.com/blog"},
      {t:"Papers With Code — stay current on what's actually shipping", u:"https://paperswithcode.com"},
      {t:"Designing ML Systems (free blog posts by Chip Huyen)", u:"https://huyenchip.com"},
      {t:"Dive into Deep Learning — continue referencing", u:"https://d2l.ai"},
    ],
    project:"Apply to startups first — faster hiring, more learning. Nail take-home assignments — they matter more than technical interviews.",
    tip:"Specialization paths: LLM app engineer (most common entry), MLOps/infra, computer vision, speech AI, robotics/RL. Pick one after Phase 06."
  }
];

export const PHASE_COLORS = ['#6366f1','#22c55e','#3b82f6','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316'];

export const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const DAY_LABELS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

export const TIPS = [
  "Ship something today, even if it's small.",
  "Code along — watching is not learning.",
  "Push to GitHub every single day.",
  "If you can't teach it, you don't know it yet.",
  "Consistent reps compound. Show up.",
  "Build something broken. Then fix it.",
  "The goal is reps, not perfection.",
  "One phase at a time. Don't skip ahead.",
];
