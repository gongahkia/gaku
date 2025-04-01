<template>
    <div class="level-selection-container">
      <h2>Choose Explanation Level</h2>
      <p class="description">
        Select how detailed you want your document summary to be.
      </p>
      
      <div class="level-cards">
        <LevelCard 
          v-for="level in levels" 
          :key="level.id"
          :level="level"
          :isSelected="selectedLevel === level.id"
          @select="selectLevel(level.id)"
        />
      </div>
      
      <DocumentPreview 
        :fileName="fileName" 
        :textPreview="textPreview" 
      />
      
      <div class="action-buttons">
        <button class="back-button" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <button 
          class="generate-button" 
          :disabled="!selectedLevel || isGenerating" 
          @click="generateSummary"
        >
          <span v-if="isGenerating">
            <LoadingSpinner />
            Generating...
          </span>
          <span v-else>Generate Summary</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useDocumentStore } from '../../stores/documentStore';
  import { useSummaryStore } from '../../stores/summaryStore';
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import LoadingSpinner from '../UI/LoadingSpinner.vue';
  import LevelCard from './LevelCard.vue';
  import DocumentPreview from './DocumentPreview.vue';
  
  const router = useRouter();
  const documentStore = useDocumentStore
  const summaryStore = useSummaryStore();

const selectedLevel = ref<number | null>(null);
const isGenerating = ref(false);

const fileName = computed(() => documentStore.fileName || 'Unnamed Document');
const textPreview = computed(() => {
  const text = documentStore.documentText;
  if (!text) return 'No text extracted';
  return text.length > 100 ? text.substring(0, 100) + '...' : text;
});

const levels = [
  { id: 1, name: 'Child (5-8 years)', emoji: '👶', description: 'Simple explanations using basic vocabulary and familiar concepts.' },
  { id: 2, name: 'Teen (13-16 years)', emoji: '🧑‍🎓', description: 'More detailed explanations with some technical terms introduced.' },
  { id: 3, name: 'College Student (18-24 years)', emoji: '🎓', description: 'In-depth explanations with field-specific terminology and concepts.' },
  { id: 4, name: 'Graduate Student (25+ years)', emoji: '🔬', description: 'Advanced explanations assuming strong background knowledge.' },
  { id: 5, name: 'Expert (30+ years)', emoji: '🧠', description: 'Highly technical and detailed explanations for subject matter experts.' },
  { id:6, name: 'Teacher', emoji: '👨‍🏫', description: 'Detailed explanations for teachers to help students understand complex concepts.' },
  { id:7, name: 'Flash Cards', emoji: '💡', description: 'Optimized for quick review, spaced repetition and memorization.' },
  { id:8, name: 'Knowledge Graph', emoji: '🌐', description: 'Visual representation of key concepts and their relationships.' },
  { id:9, name: 'Fries in the Bag', emoji: '🍟', description: 'One paragraph summaries of core ideas.' },
  { id:10, name: 'r/PoorlyExplained', emoji: '📱', description: 'How not to explain something.' },
];

const selectLevel = (levelId: number) => {
  selectedLevel.value = levelId;
};

const goBack = () => {
  router.push('/');
};

const generateSummary = async () => {
  if (!selectedLevel.value) return;
  isGenerating.value = true;
  try {
    const level = levels.find(l => l.id === selectedLevel.value);
    if (!level) throw new Error('Invalid level selected');
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = getLevelSpecificPrompt(level.id, documentStore.documentText); // tailored prompts for each usecase
    console.log(prompt);
    const result = await model.generateContent(prompt);
    console.log(result);
    const summary = result.response.text();
    summaryStore.setSummary(summary);
    summaryStore.setLevel(level);
    router.push('/summary');
  } catch (error) {
    console.error('Error generating summary:', error);
    alert('An error occurred while generating the summary. Please try again.');
  } finally {
    isGenerating.value = false;
  }
};

const getLevelSpecificPrompt = (levelId: number, documentText: string): string => {
  documentText = `
In the EU, there is no specific IP right available for fictional characters; instead, protection relies on a combination of copyright, trademark, and design laws.
The EU's trademark reform package has loosened rules for 'graphical representation,' allowing organizations to use non-traditional trademarks (such as 3D or motion marks) to protect characters.
Copyright protection in the EU extends to fictional characters when they constitute the "author's own intellectual creation".
Recent case law has clarified that the physical appearance of a fictional character is copyrightable when the combination of all physical characteristics produces a distinctive overall impression.
For parody and pastiche uses, the EU's Copyright Directive (2001/29/EC) provides an optional exception to copyright infringement, which member states may implement in their national laws.
Australia has no specific right that protects the use of a person's name, photograph, or likeness
Character merchandising in Australia relies primarily on intellectual property regimes including copyright, registered designs, and trademarks.
For unauthorized uses of character images, Australian law offers potential remedies through:
Defamation law
The Australian Consumer Law (prohibiting misleading or deceptive conduct)
Unlike the United States, which recognizes a "right of publicity," Australia has no specific law aimed at preventing unauthorized use of a person's image.
Singapore provides robust protection for intellectual property, ranking second globally for IP protection according to the World Economic Forum's Global Competitiveness Index.
Under Singapore's copyright law, which was updated in 2021, content creators are now the default copyright owners of all types of commissioned content, including characters. The new Copyright Act also prohibits selling products and services that provide access to copyright-infringing content.
Singapore, like Australia, does not recognize a specific right of publicity or personality right. Protection for character merchandising relies on copyright, trademark, and design laws, with copyright beginning automatically when a work is created
  `
  const prompts = {
    1: `You are explaining to a young child (5-8 years old). 
       Use very simple vocabulary, short sentences, and familiar examples.
       Avoid abstract concepts.
       Use concrete examples that relate to a child's everyday experiences.
       Explain as if you're telling a story to maintain engagement.
       Limit your explanation to 3-5 simple paragraphs.
       Here's the text to summarize: ${documentText}`,
    
    2: `You are explaining to a teenager (13-16 years old).
       Use clear language with some introductory technical terms (but explain them).
       Include relatable examples that connect to teen interests and experiences.
       You can introduce some complexity, but maintain clarity.
       Include 1-2 thought-provoking questions to stimulate curiosity.
       Structure your explanation with clear headings if needed.
       Here's the text to summarize: ${documentText}`,
    
    3: `You are explaining to a college student (18-24 years).
       Use proper academic language and field-specific terminology.
       Provide in-depth explanations of concepts and their relationships.
       Include relevant theoretical frameworks where appropriate.
       Reference key principles and methodologies in the field.
       Structure your explanation with clear sections and logical flow.
       Here's the text to summarize: ${documentText}`,
    
    4: `You are explaining to a graduate student (25+ years).
       Use advanced terminology and concepts without simplification.
       Assume strong background knowledge in the subject area.
       Discuss methodological considerations and limitations.
       Address nuances, exceptions, and competing perspectives.
       Include references to advanced concepts and current research directions.
       Here's the text to summarize: ${documentText}`,
    
    5: `You are explaining to a subject matter expert.
       Use the most technical and precise language appropriate for the field.
       Focus on cutting-edge aspects and nuanced details.
       Discuss theoretical implications and methodological considerations.
       Address gaps, limitations, and potential future directions.
       Reference specialized frameworks and advanced concepts.
       Here's the text to summarize: ${documentText}`,
    
    6: `You are creating an explanation for a teacher to use with students.
       Structure the content in a teaching-friendly format.
       Include 3-5 key learning objectives at the beginning.
       Provide explanations at multiple levels of complexity.
       Include suggested analogies, examples, and visual descriptions.
       Add 2-3 discussion questions and potential student misconceptions to address.
       End with a simple assessment activity suggestion.
       Here's the text to summarize: ${documentText}`,
    
    7: `Create a set of 10-15 flash cards based on this content.
       Format each flash card as "Question: [question]" followed by "Answer: [answer]"
       Questions should be concise and focus on key concepts.
       Answers should be brief (1-3 sentences) and precise.
       Include a mix of definition, application, and conceptual questions.
       Ensure cards progress from fundamental to more advanced concepts.
       Here's the text to use: ${documentText}`,
    
    8: `Create a knowledge graph representation of the key concepts in this text.
       Format your response as a single mermaid diagram returned within a code block.
       Ensure the diagram follows a valid mermaid syntax that can be rendered.
       The mermaid diagram should depict the following if applicable.
       1. Core concepts within the text
       2. Relationships between concepts (how they connect)
       3. Hierarchical structure (which concepts contain others)
       4. Key attributes for each concept
       Here's the text to analyze: ${documentText}`,
    
    9: `Create an extremely concise providing an overview appropriate for laymen.
       Limit your response to ONE paragraph (3-5 sentences maximum).
       Focus only on the most essential core ideas.
       Use clear, direct language with no unnecessary words.
       Ensure the summary could be understood by a general audience.
       Here's the text to summarize: ${documentText}`,

    10: `Create a summary that jumps between peripheral ideas that are not the main point of the text.
      Ensure the response is at least THREE paragraphs (6-10 sentences minimum).
      Use convaluted, wordy language and sentence structure.
      The summary must not be easily understood by a general audience.
      Include three or more awkwardly phrased metaphors in the summary.
      Here's the text to summarize: ${documentText}`,
  };
  
  return prompts[levelId as keyof typeof prompts] || 
    `Summarize the following text for a general audience: ${documentText}`;
};
</script>

<style lang="scss" scoped>
.level-selection-container {
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #6b7280;
    margin-bottom: 2rem;
  }
  
  .level-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    
    .back-button {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:hover {
        background-color: rgba(79, 70, 229, 0.05);
      }
    }
    
    .generate-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}
</style>