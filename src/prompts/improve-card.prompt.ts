import type { CardDto } from "../dto/card.js";

export function buildImprovePrompt(card: CardDto): string {
  return `
    You are an expert in Japanese linguistics, Japanese grammar, and Anki flashcard editing.

    You will receive a JSON object representing a flashcard.

    Each flashcard has the following structure:

    {
      "id": number,
      "title": string,
      "content": string,
      "tags": string[]
    }

    Your tasks:

    1. Determine whether the flashcard represents:
       - a vocabulary word;
       - a grammar pattern.

    2. If it is a vocabulary word:
       - determine its part of speech;
       - determine whether it is keigo;
       - if it is keigo, determine its type:
         - 尊敬語
         - 謙譲語
         - 丁寧語

    3. Preserve all existing tags.

    4. Add new tags only if they are not already present.

    5. Never remove existing tags.

    6. Correct the title only when there is a clear linguistic or orthographic error.

    7. If the title is written entirely or mostly in hiragana, determine whether the hiragana spelling is actually incorrect.

    8. If the hiragana spelling is a valid, standard, or commonly used spelling, preserve it.

    9. If multiple valid spellings exist, preserve the original spelling.
       Do not replace it simply because another spelling is more common.

    10. Never modernize or normalize a word solely because it is archaic, historical,
        literary, uncommon, or written using historical orthography.
        The user may intentionally be studying older or less common Japanese.

    11. If a word is commonly used with the honorific prefix お or ご as part of
        its normal expression, include the prefix in the title using parentheses
        to indicate that it is optional or variable.

        For example:

        （ご）主人

        Use this format only when the prefix is genuinely relevant to the normal
        usage of the word. Do not add お or ご merely because the word can
        theoretically be made more polite.

    12. Correct mistakes in the reading, Russian translation, or formatting inside "content".

    13. Preserve the existing formatting whenever possible.
        Only modify the specific parts that require correction or addition.

    14. Use "\\n" for line breaks inside "content".

    15. Never use HTML tags for line breaks.

        In particular, do NOT use:
        - "<br>"
        - "<br/>"
        - "<br />"

    16. If the flashcard is a vocabulary word:
        - If there is already a Japanese example sentence, keep it.
        - Otherwise, add one.

        The example sentence must:
        - be natural Japanese;
        - be short;
        - use common vocabulary;
        - clearly demonstrate the meaning.

        Immediately after it, add its Russian translation.

        The final format should be:

        \\n
        例：
        Перевод：

    17. If the flashcard is a grammar pattern:
        - Do NOT generate an example sentence if one already exists.
        - If there is no grammar explanation, add one.
        - The explanation must begin with the grammatical construction.

        For example:

        Vて形＋てまいります

        or

        N＋らしい

        or

        普通形＋ようです

        After the construction, provide a concise explanation in Russian
        describing when the grammar is used.

        If there is no example sentence, add one after the explanation.

        The format should be:

        例：
        Перевод：

    18. Use ONLY the following part-of-speech tags:

        名詞
        動詞
        い形容詞
        な形容詞
        副詞
        代名詞
        接続詞
        感動詞
        接頭辞
        接尾辞
        連語
        助詞
        助数詞

    19. Use ONLY the following keigo tags:

        尊敬語
        謙譲語
        丁寧語

    20. Sort tags in the following order:
        1. Part of speech
        2. Keigo type, if applicable
        3. All remaining existing tags in their original order

    21. Never invent any additional tags.

    22. If you are not confident about a correction or classification,
        leave the original value unchanged.

    23. Return ONLY the JSON object representing the improved flashcard.

    24. Return ONLY valid JSON.

    25. Do NOT use Markdown.

    26. Do NOT wrap the JSON inside triple backticks.

    27. Do NOT include explanations, comments, or any text outside the JSON.

    28. Do NOT include the "id" field in the response.

    29. The response must have exactly these fields:
        - "title"
        - "content"
        - "tags"

    30. There must always be exactly one empty line between the Russian translation
        of the word and the example sentence.

        The format must be:

        Japanese reading or additional information
        Russian translation

        例：Japanese example sentence
        Перевод: Russian translation of the example

    Card:

    ${JSON.stringify(card, null, 2)}

    {
      "title": "...",
      "content": "...",
      "tags": ["..."]
    }
  `;
}
