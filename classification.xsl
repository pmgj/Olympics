<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="year" select="'1896'" />
    <xsl:output method="html" />
    <xsl:template match="/">
        <table class="table table-striped">
            <caption class="caption-top"><xsl:value-of select="$year" /> (<xsl:value-of
                    select="//olympics[@year = $year]/@location" />)</caption>
            <thead class="table-dark">
                <tr>
                    <th>Country</th>
                    <th>Gold</th>
                    <th>Silver</th>
                    <th>Bronze</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//olympics[@year = $year]/country">
                    <tr>
                        <td><xsl:value-of select="text()" /></td>
                        <td><xsl:value-of select="@gold" /></td>
                        <td><xsl:value-of select="@silver" /></td>
                        <td><xsl:value-of select="@bronze" /></td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
</xsl:stylesheet>