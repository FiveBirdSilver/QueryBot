import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { styled } from 'styled-components'

interface CodeBlockProps {
  language: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={materialDark}>
    {value}
  </SyntaxHighlighter>
)

const commonHeadingStyle = {
  margin: '0.5em 0',
  color: '#fff',
}

const commonTextStyle = {
  fontSize: '0.785rem',
  margin: '0.5em 0',
}

const headingComponents = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(
  (acc, tag) => {
    acc[tag] = styled(tag)`
      font-size: ${tag === 'h4'
        ? '0.925rem'
        : tag === 'h1' || tag === 'h2' || tag === 'h3'
          ? '1rem'
          : '0.785rem'};
      ${commonHeadingStyle}
    `
    return acc
  },
  {} as Record<string, React.ComponentType<any>>
)

const StyledParagraph = styled.p`
  ${commonTextStyle}
`

const StyledList = styled.ul`
  padding-left: 1.5em;
  margin: 0.5em 0;
`

const StyledListItem = styled.li`
  margin: 0.25em 0;
`

const StyledBlockquote = styled.blockquote`
  border-left: 4px solid #ccc;
  padding-left: 1em;
  margin: 0.5em;
`

const StyledHr = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
`

const StyledStrong = styled.strong`
  font-weight: bold;
`

const MarkdownRenderer = styled(ReactMarkdown).attrs({
  remarkPlugins: [remarkGfm],
  components: {
    code: ({ node, inline, className, children, ...props }: any) =>
      !inline ? (
        <CodeBlock
          language={(className || '').replace('language-', '') || 'text'}
          value={String(children).replace(/\n$/, '')}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      ),
    ...headingComponents,
    p: StyledParagraph,
    ul: StyledList,
    ol: StyledList,
    li: StyledListItem,
    blockquote: StyledBlockquote,
    hr: StyledHr,
    strong: StyledStrong,
  },
})``

export default MarkdownRenderer
