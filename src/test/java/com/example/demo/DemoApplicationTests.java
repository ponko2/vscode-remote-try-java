package com.example.demo;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.nullValue;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import java.net.InetAddress;
import java.sql.Connection;
import java.sql.DriverManager;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

  @Test
  void contextLoads() {}

  @Disabled
  @Test
  void testIp() throws Exception {
    final var hostname = System.getenv("MYSQL_HOSTNAME");
    assertThat(hostname, is(not(nullValue())));

    final var address = InetAddress.getByName(hostname);
    System.out.println("Sending Ping Request to " + hostname);

    assertThat("Unable to reach MySQL Container Host", address.isReachable(5000), is(true));
    System.out.println("Successfully Reached: " + hostname);
  }

  @Disabled
  @Test
  void testLogin() throws Exception {
    final var hostname = System.getenv("MYSQL_HOSTNAME");
    assertThat(hostname, is(not(nullValue())));

    final var database = System.getenv("MYSQL_DATABASE");
    assertThat(database, is(not(nullValue())));

    final var username = System.getenv("MYSQL_USER");
    assertThat(username, is(not(nullValue())));

    final var password = System.getenv("MYSQL_PASSWORD");
    assertThat(password, is(not(nullValue())));

    System.out.println("Logging into postgresql at " + hostname);
    createConnection(hostname, database, username, password);
    System.out.println("Successfully logged into: " + hostname);
  }

  @SuppressFBWarnings(
      value = "RCN_REDUNDANT_NULLCHECK_WOULD_HAVE_BEEN_A_NPE",
      justification = "False positive")
  @Disabled
  @Test
  void testSqlCommand() throws Exception {
    final var hostname = System.getenv("MYSQL_HOSTNAME");
    assertThat(hostname, is(not(nullValue())));

    final var database = System.getenv("MYSQL_DATABASE");
    assertThat(database, is(not(nullValue())));

    final var username = System.getenv("MYSQL_USER");
    assertThat(username, is(not(nullValue())));

    final var password = System.getenv("MYSQL_PASSWORD");
    assertThat(password, is(not(nullValue())));

    final var conn = createConnection(hostname, database, username, password);
    conn.setAutoCommit(false);

    try (var stmt = conn.createStatement()) {
      final var rs = stmt.executeQuery("SELECT * FROM mysql.db LIMIT 1;");
      System.out.println("Name of 1st database in this cluster.");

      while (rs.next()) {
        final var databaseName = rs.getString("db");
        System.out.printf("Database Name = %s ", databaseName);
        System.out.println();
      }
    }
  }

  private Connection createConnection(
      final String hostname, final String database, final String username, final String password)
      throws Exception {
    return DriverManager.getConnection(
        String.format("jdbc:mysql://%s/%s", hostname, database), username, password);
  }
}
