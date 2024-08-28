import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { styled } from 'styled-components'

const CodeBlock = ({
  language,
  value,
  disallowedElements,
}: {
  language: string
  value: string
  disallowedElements: any
}) => (
  <SyntaxHighlighter
    language={language}
    style={materialDark}
    onClick={() => console.log(disallowedElements)}
  >
    {value}
  </SyntaxHighlighter>
)

const MarkdownRenderer = styled(ReactMarkdown).attrs({
  remarkPlugins: [remarkGfm],
  components: {
    code: ({
      node,
      inline,
      className,
      disallowedElements,
      children,
      ...props
    }: any) =>
      !inline ? (
        <CodeBlock
          language={className?.replace('language-', '') || 'text'}
          value={String(children).replace(/\n$/, '')}
          disallowedElements={disallowedElements}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      ),
    h1: (props: any) => (
      <h1 style={{ fontSize: '1rem', margin: '0.5em 0' }}>{props.children}</h1>
    ),
    h2: (props: any) => (
      <h2 style={{ fontSize: '0.925rem', margin: '0.5em 0' }}>
        {props.children}
      </h2>
    ),
    h3: (props: any) => (
      <h3 {...props} style={{ fontSize: '0.925rem', margin: '0.5em 0' }}>
        {props.children}
      </h3>
    ),
    h4: (props: any) => (
      <h4 {...props} style={{ fontSize: '0.875rem' }}>
        {props.children}
      </h4>
    ),
    h5: (props: any) => (
      <h5 {...props} style={{ fontSize: '0.725rem' }}>
        {props.children}
      </h5>
    ),
    h6: (props: any) => (
      <h6 {...props} style={{ fontSize: '0.725rem' }}>
        {props.children}
      </h6>
    ),
    p: (props: any) => (
      <p {...props} style={{ fontSize: '0.725rem', margin: '0.5em 0' }} />
    ),
    ul: (props: any) => (
      <ul {...props} style={{ paddingLeft: '1.5em', margin: '0.5em 0' }} />
    ),
    ol: (props: any) => (
      <ol {...props} style={{ paddingLeft: '1.5em', margin: '0.5em 0' }} />
    ),
    li: (props: any) => <li {...props} style={{ margin: '0.25em 0' }} />,
    pre: (props: any) => (
      <li {...props} style={{ margin: '0.5em', cursor: 'pointer' }} />
    ),
    blockquote: (props: any) => (
      <blockquote
        {...props}
        style={{
          borderLeft: '4px solid #ccc',
          paddingLeft: '1em',
          margin: '0.5em',
        }}
      />
    ),
    hr: (props: any) => (
      <hr
        {...props}
        style={{ border: '0', borderTop: '1px solid #ccc', margin: '1em 0' }}
      />
    ),
    strong: (props: any) => (
      <strong {...props} style={{ fontWeight: 'bold' }} />
    ),
  },
})``

export default MarkdownRenderer
